import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

// A custom data type for one to-do item
interface Task {
  id: number;
  title: string;
  date: string; // stored as "YYYY-MM-DD"
  done: boolean;
}

// Reusable component: one row in the task list (uses props)
interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
          ✕
        </IconButton>
      }
      disablePadding
    >
      <Checkbox checked={task.done} onChange={() => onToggle(task.id)} />
      <ListItemText
        primary={task.title}
        sx={{ textDecoration: task.done ? 'line-through' : 'none' }}
      />
    </ListItem>
  );
}

function App() {
  // State: the date the user clicked, the list of tasks, and the text box
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');

  const dateKey = selectedDate.format('YYYY-MM-DD');
  const tasksForDay = tasks.filter((t) => t.date === dateKey);

  function addTask() {
    if (newTitle.trim() === '') return;
    const task: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      date: dateKey,
      done: false,
    };
    setTasks([...tasks, task]); // new array -> React re-renders
    setNewTitle('');
  }

  function toggleTask(id: number) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          To-Do Calendar
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {/* Left: the calendar */}
          <Paper elevation={3}>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate) => newDate && setSelectedDate(newDate)}
            />
          </Paper>

          {/* Right: the panel for the selected day */}
          <Paper elevation={3} sx={{ p: 2, flex: 1, minWidth: 280 }}>
            <Typography variant="h6">
              {selectedDate.format('dddd, MMMM D')}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
              <TextField
                size="small"
                fullWidth
                label="New task"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
              />
              <Button variant="contained" onClick={addTask}>
                Add
              </Button>
            </Box>

            {tasksForDay.length === 0 ? (
              <Typography color="text.secondary">No tasks for this day.</Typography>
            ) : (
              <List>
                {tasksForDay.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </List>
            )}
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
