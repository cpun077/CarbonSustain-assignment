import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react';
import { getall, put, get, post, del } from '../requesthandler';
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
    const [selectionStatus, setSelectionStatus] = useState({ ids: new Set(), type: 'include' }) // current selection event details
    const [selectedIDs, setSelectedIDs] = useState([]) // current selected ids
    const [openForm, setOpenForm] = useState(false)

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
            const response = await post(row) // add on server 
            setRows(prevRows => [...prevRows, response.data]) // add on client
            setOpenForm(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { // updates selected rows state
        const selectedIDs = [...selectionStatus.ids] // convert from set to array
        var selectedRows = rows.map((row) => row.id) // start as ids of all rows
        if (selectionStatus.type == 'include') {
            selectedRows = selectedRows.filter((rowid) => { // rows that match the selected ids
                return selectedIDs.some((id) => id == rowid) // finds first match to include
            })
        } else if (selectionStatus.type == 'exclude') {
            if (selectedIDs.length !== 0) {
                selectedRows = selectedRows.filter((rowid) => { // rows that don't match the selected ids
                    return !selectedIDs.some((id) => id == rowid) // waits until a match is made to exclude
                })
            }
        }
        setSelectedIDs(selectedRows)
    }, [selectionStatus])

    const delRows = () => {
        selectedIDs.forEach((id) => del(id)) // delete on server
        const newRows = rows.filter((row) => { // delete on client
            return !selectedIDs.some((id) => id == row.id)
        })
        setRows(newRows)
        setSelectedIDs([])
    }

    return (
        <div className='tablecontainer'>
            <EnhancedTableToolbar selectedRows={selectionStatus} openPopup={openPopup} delRows={delRows} />
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                    flex: 1,
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: 'darkseagreen',
                    },
                }}
                disableRowSelectionOnClick

                /* Selection props for delete functionality */
                checkboxSelection
                rowSelectionModel={selectionStatus}
                onRowSelectionModelChange={
                    (rows) => { setSelectionStatus(rows) }
                }

                processRowUpdate={putRow}
                onProcessRowUpdateError={(error) => console.log(error)}
            />
            <PopupForm open={openForm} closePopup={closePopup} addRow={addRow} />
        </div>
    )
}

export default DataTable