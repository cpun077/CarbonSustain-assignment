import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function EnhancedTableToolbar(props) {
    const { selectedRows, openPopup, delRows } = props;
    const size = selectedRows['ids'].size;

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
                <strong>Action Log</strong>
            </Typography>
            {size > 0 ? (
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