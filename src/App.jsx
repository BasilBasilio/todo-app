import { Header } from "./components/Header"
import { Tasks } from "./components/Tasks"
import { useState, useEffect } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const LOCAL_STORAGE_KEY = "todo: savedTasks";

function App() {
  const [tasks, setTasks] = useState([]);

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function loadSaveTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSaveTasks();
  }, [])

  function addTask(taskTitle) {
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false
      }
    ])
  }

  function deleteTask(taskId) {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(updatedTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    })
    setTasksAndSave(newTasks);
  }

  function moveTask(dragIndex, hoverIndex) {
    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasksAndSave(updatedTasks);
  }


  return (
    <DndProvider backend={HTML5Backend}>
      <Header onAddTask={addTask} />
      <Tasks 
        tasks={tasks}
        onComplete={toggleTaskCompletedById}
        onDelete={deleteTask}
        moveTask={moveTask} 
      />
    </DndProvider>
  )
}

export default App;
