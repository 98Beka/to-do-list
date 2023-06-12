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
  removeTodolist: (todolistId: string) => void
  changeTask: (taskId: string, value: string, todolistId: string) => void
  filter: FilterValuesType
}

export function ToDoList(props: PropsType) {
  const onAllClickHandler = () => props.setFilter("all", props.id);
  const onActiveClickHandler = () => props.setFilter("active", props.id);
  const onCompletedClickHandler = () => props.setFilter("completed", props.id);
  const onRemoveHandler = (taskId: string) => props.removeTask(taskId, props.id);
  const onChangeStatusHandler = (taskId: string, isDone: boolean) => props.changeStatus(taskId, isDone, props.id);
  const onRemoveTodolistHandler = () => props.removeTodolist(props.id);
  const onChangeTaskHandler = (taskId:string, value:string) => props.changeTask(taskId, value, props.id)
  return (
    <div>
      <h3>{props.title}<button onClick={onRemoveTodolistHandler}>x</button></h3>
      <AddItemForm addItem={(value) => props.addTask(value, props.id)}/>
      <ul>
        {
          props.tasks.map(t =>
            <li className={t.isDone ? "is-done" : ""}>
              <input type="checkbox" checked={t.isDone} onChange={(e) => onChangeStatusHandler(t.id, e.currentTarget.checked)} />
              <EditableSpan title={t.title} changeTask={(value) => onChangeTaskHandler(t.id, value)}/>
              <button onClick={() => onRemoveHandler(t.id)}>x</button>
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


