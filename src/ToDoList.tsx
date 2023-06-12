import React from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  setFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
}

export function ToDoList(props: PropsType) {
  const onAllClickHandler = () => props.setFilter("all", props.id);
  const onActiveClickHandler = () => props.setFilter("active", props.id);
  const onCompletedClickHandler = () => props.setFilter("completed", props.id);
  const onRemoveHandler = (taskId: string, todolistId: string) => props.removeTask(taskId, todolistId);
  const onChangeStatusHandler = (id: string, isDone: boolean, todolistId: string) => props.changeStatus(id, isDone, todolistId);
  return (
    <div>
      <h3>{props.title}<button>x</button></h3>
      <AddItemForm addItem={(value) => props.addTask(value, props.id)}/>
      <ul>
        {
          props.tasks.map(t =>
            <li className={t.isDone ? "is-done" : ""}>
              <input type="checkbox" checked={t.isDone} onChange={(e) => onChangeStatusHandler(t.id, e.currentTarget.checked, props.id)} />
              <EditableSpan title={t.title}/>
              <button onClick={() => onRemoveHandler(t.id, props.id)}>x</button>
            </li>)
        }
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? "active-filter" : ""}
          onClick={onAllClickHandler}>All</button>
        <button
          className={props.filter === 'active' ? "active-filter" : ""}
          onClick={onActiveClickHandler}>Active</button>
        <button
          className={props.filter === 'completed' ? "active-filter" : ""}
          onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}


