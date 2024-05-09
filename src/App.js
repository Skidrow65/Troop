import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import {useEffect, useState} from "react";

function App() {
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name,done:false}];
    });
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 0) {
      return 'Lets Start Todays Tasks';
    }
    if (percentage === 100) {
      return 'All Tasks Completed 🍀';
    }
    return 'Create a new schedule ';
  }

  function renameTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (
    <main>
      <section id="header">
      🐒Troop
      </section>
      <p>...</p>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task,index) => (
        <Task {...task}
              onRename={newName => renameTask(index,newName)}
              onTrash={() => removeTask(index)}
              onToggle={done => updateTaskDone(index, done)} />
      ))}
     <footer>
     <div>
            <ul id="navbar">
            <li><i class="fa fa-grav"></i><a class="active" href="Contact.html">Home</a></li>
                <li><i class="fa fa-archive"></i><a href="index.html">Archives</a></li>
                <li><i class="fa fa-calendar"></i><a href="About.html">Scheduler</a> </li>
                <li><i class="fa fa-tasks"></i><a href="Contact.html">Lists</a></li>
            </ul>
            </div>
      </footer>
    </main>
  );
}

export default App;
