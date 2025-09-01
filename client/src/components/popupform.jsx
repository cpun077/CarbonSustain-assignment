import { 
    Dialog, 
    DialogTitle, 
    IconButton, 
    Button, 
    Stack,
    TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

const PopupForm = ({ open, closePopup, addRow }) => {
    const [action, setAction] = useState('')
    const [points, setPoints] = useState()
    const [date, setDate] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        let row = {
            'action': action,
            'date': date.format('YYYY-MM-DD'),
            'points': points,
        }
        addRow(row)
        setAction('')
        setPoints()
        setDate()
    }

    return (
        <Dialog open={open} fullWidth maxWidth='xs'>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <DialogTitle>Add New Log</DialogTitle>
                <div>
                    <IconButton onClick={closePopup}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Stack>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} margin={2}>
                    <TextField label='Action' value={action} onChange={(e) => setAction(e.target.value)} required/>
                    <TextField label='Points' type='number' value={points} onChange={(e) => setPoints(e.target.value)} required/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label='Date' onChange={(date) => setDate(date)} slotProps={{ textField: { required: true } }}/>
                    </LocalizationProvider>
                    <Button variant='contained' type='submit' sx={ {background: 'darkseagreen'} }>Confirm</Button>
                </Stack>
            </form>
        </Dialog>
    )
}

export default PopupForm