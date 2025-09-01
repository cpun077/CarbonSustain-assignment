import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react';
import { getall, put, get, post } from '../requesthandler';
import PopupForm from './popupform';
import EnhancedTableToolbar from './enhancedtabletoolbar';
import './table.css'

const columns = [
    { field: 'id', headerName: 'ID', flex: .1 },
    { field: 'action', headerName: 'Action', flex: .55, editable: true },
    { field: 'date', headerName: 'Date', flex: .2, editable: true },
    { field: 'points', headerName: 'Points', flex: .15, editable: true },
]

const initialrow = [
    { id: -1, action: "Shenanigans", date: "9999-99-99", points: 67 },
]

const DataTable = () => {
    const [rows, setRows] = useState(initialrow)
    const [selectedRows, setSelectedRows] = useState({ ids: new Set(), type: 'include' });
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => { // updates selected rows state
        console.log(selectedRows)
    }, [selectedRows])

    const putRow = async (changedRow) => { // handle edited row
        try {
            const response = await put(changedRow)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { // get all rows from db at start
        const fetchRows = async () => {
            try {
                const response = await getall()
                setRows(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRows()
    }, [])

    const openPopup = () => { // pass handler to toolbar component
        setOpenForm(true)
    }

    const closePopup = () => { // pass handler to form component
        setOpenForm(false)
    }

    const addRow = async (row) => {
        try {
            const response = await post(row)
            setRows(prevRows => [...prevRows, response.data])
            setOpenForm(false)
        } catch (error) {
            console.log(error)
        }
    }

    const delRows = () => {
        console.log("del rows!")
    }

    return (
        <div className='tablecontainer'>
            <EnhancedTableToolbar selectedRows={selectedRows} openPopup={openPopup} delRows={delRows} />
            <DataGrid
                rows={rows}
                columns={columns}
                sx={ {flex: 1} }
                disableRowSelectionOnClick

                /* Selection props for delete functionality */
                checkboxSelection
                rowSelectionModel={selectedRows}
                onRowSelectionModelChange={
                    (rows) => { setSelectedRows(rows) }
                }
                processRowUpdate={putRow}
                onProcessRowUpdateError={(error) => console.log(error)}
            />
            <PopupForm open={openForm} closePopup={closePopup} addRow={addRow} />
        </div>
    )
}

export default DataTable