import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function EnhancedTableToolbar(props) {
    const { selectedRows, openPopup, delRows } = props;
    const selected = (selectedRows.ids.size == 0  && selectedRows.type == 'include') ? false : true

    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                selected && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            <Typography
                sx={{ flex: '1 1 100%', color: 'black' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                <strong>Action Log</strong>
            </Typography>
            {selected ? (
                <Tooltip title="Delete">
                    <IconButton onClick={delRows}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Add New Log">
                    <IconButton onClick={openPopup}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default EnhancedTableToolbar