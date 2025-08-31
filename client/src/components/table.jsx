import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useState, useEffect } from 'react';
import { getall } from '../requesthandler';

const columns = [
    {field: 'id', headerName: 'ID', width: 90},
    {field: 'action', headerName: 'Action', width: 200, editable: true},
    {field: 'date', headerName: 'Date', width: 150, editable: true},
    {field: 'points', headerName: 'Points', width: 90, editable: true},
]

const initialrow = [
    {id: -1, action: "Shenanigans", date: "9999-99-99", points: 67},
]

function EnhancedTableToolbar(props) {
  const { rows } = props;
  const size = rows['ids'].size;
  
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        size > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Action Log
        </Typography>
      {size > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

const Grid = () => {
    const [rows, setRows] = useState(initialrow)
    const [selectedRows, setSelectedRows] = useState({ ids: new Set(), type: 'include' });
    const [editing, setEditing] = useState(false);

    useEffect(() => { // updates selected rows state
        console.log(selectedRows)
    }, [selectedRows])

    useEffect(() => { // updates when editing has stopped
        if (editing == false) {
            console.log('save')
        }
    }, [editing])

    useEffect(() => { // get rows from db
        const fetchRows = async () => {
            try {
                const response = await getall()
                setRows(response.data)
            } catch(error) {
                console.log(error)
            }
        }
        fetchRows()
    }, [])

    return (
        <div>
            <EnhancedTableToolbar rows={selectedRows}/>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick

                /* Selection props for delete functionality */
                checkboxSelection
                rowSelectionModel={selectedRows}
                onRowSelectionModelChange={
                    (rows) => {setSelectedRows(rows)}
                }
                onCellEditStop={() => console.log("BYE")}
            />
        </div>
    )
}

export default Grid