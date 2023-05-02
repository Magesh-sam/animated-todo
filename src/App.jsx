import { useState } from "react";
import "./app.css";
import { v4 as todoid } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti'
import DeleteIcon from "@mui/icons-material/Delete";
import {
  TextField,
  Button,
  IconButton,
  Checkbox,
  Container,
  Stack,
  List,
  Typography,
} from "@mui/material";
export const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = () => {
    if (!task) {
      alert("Please enter your task");
      return;
    }
    const newTask = {
      id: todoid(),
      task,
      isComplete: false,
    };
    setTodos((prev) => [...prev, newTask]);
    setTask("");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isComplete: !todo.isComplete, // toggle the isComplete property
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Container sx={{ my: 5 }}   >
      <Typography
        variant="h3"
        align="center"
        sx={{
          textDecoration: "2px solid black underline",
          textUnderlineOffset: "8px",
        }}
      >
        Animated To-do
      </Typography>
      <Stack direction={"row"} justifyContent={"center"} gap={5} p={3}>
        <TextField
          type="text"
          value={task}
          label="To-do"
          placeholder="taskname"
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add Task
        </Button>
      </Stack>
      <List sx={{ width: "500px", margin: "0 auto", my: 5 }}>
        <AnimatePresence>
          {todos.map((todo,index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              // transition={{duration:0.5}}
              drag={true} 
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              style={{display:'flex',margin:'15px'}}
            >
                <Typography
                  sx={{
                    textDecoration: todo.isComplete
                      ? "3px solid red line-through"
                      : null,
                  }}
                  variant="h4"
                >{`${index+1}. ${todo.task}`}</Typography>
                <Stack direction={'row'} sx={{ display: "flex", gap: "15px",marginLeft:'auto' }}>
                  <Checkbox
                    checked={todo.isComplete}
                    onChange={() => {
                      handleCheckbox(todo.id);
                    }}
                  />
                <IconButton
                  disableRipple
                    sx={{ bgcolor: "red", color: "white" }}
                    onClick={() => handleDelete(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </Container>
  );
};
