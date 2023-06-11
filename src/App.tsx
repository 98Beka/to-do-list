import React, { useState } from 'react';
import './App.css'
import { TaskType, ToDoList } from './ToDoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "completed" | "active";
type ToDoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key:string] : Array<TaskType>
}
function App() {
  
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [tasksOjb, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "css", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "React", isDone: true }
    ],
    [todolistId2]:[
      { id: v1(), title: "spider man", isDone: true },
      { id: v1(), title: "Halk incredble", isDone: false }
    ]
  });

  let [todolists, setTodoLists]  = useState<Array<ToDoListType>>([
    { id: todolistId1, title: "what to learn", filter: "active" },
    { id: todolistId2, title: "what to watch", filter: "active" }
  ])


  function removeTask(taskId: string, todolistId: string) {
    tasksOjb[todolistId] = tasksOjb[todolistId].filter(t => t.id !== taskId)
    setTasks({...tasksOjb});
  }

  function changeFilter(value: FilterValuesType, todolistsId: string) {
    let todolist = todolists.find(tl => tl.id === todolistsId);
    if(todolist) {
      todolist.filter = value;
      setTodoLists([...todolists]);
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let task = tasksOjb[todolistId].find(t => t.id === taskId);
    debugger;
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksOjb});
    }
  }

  function addTask(props: string, todolistId: string) {
    let newTask = { id: v1(), title: props, isDone: false};
    tasksOjb[todolistId] = [newTask, ...tasksOjb[todolistId]];
    setTasks({...tasksOjb});
  }

  function addTodolist(title: string){
    let todolist:ToDoListType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodoLists([todolist, ...todolists])
    setTasks({
      ...tasksOjb,
      [todolist.id]:[]
    })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {
        
        todolists.map((tl) => {
          let tasksForTodolist = tasksOjb[tl.id];
          if (tl.filter === "completed") {
            tasksForTodolist = tasksOjb[tl.id].filter(t => t.isDone);
          }
          if (tl.filter === "active") {
            tasksForTodolist = tasksOjb[tl.id].filter(t => !t.isDone);
          }
          return <ToDoList
            key={tl.id}
            id={tl.id}
            tasks={tasksForTodolist}
            title={tl.title}
            removeTask={removeTask}
            setFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
          />
        })

      }
    </div>
  );
}

export default App;
