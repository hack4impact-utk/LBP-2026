import { useState } from 'react';
import dayjs from 'dayjs';
import { Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState<Record<string, string[]>>({});
  const [newText, setNewText] = useState('');
  const dateKey = selectedDate.format('YYYY-MM-DD');

  function handleAdd(){
    const current = events[dateKey] || [];
    setEvents({...events, [dateKey]: [...current, newText] });
    setNewText('');
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h1>Calendar</h1>
      <DateCalendar
        value={selectedDate}
        onChange={(newDate) => newDate && setSelectedDate(newDate)}
      />
      <p>Selected: {selectedDate.format('MM/DD/YYYY')}</p>
      <TextField
        label="Wuts Happening?"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <Button variant="contained" onClick={handleAdd}>Add</Button>
      <ul>
        {(events[dateKey] || []).map((item, i) => (
          <li key={i}>{item}</li>
      ))}
      </ul>
    </LocalizationProvider>
  )
}

export default App
