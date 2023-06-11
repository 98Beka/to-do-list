import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [error, setError] = useState<string | null>("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter")
      addTask();

    else
      setError(null);
  };
  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Field title is required!");
      return;
    }
    props.addItem(newTaskTitle);
    setNewTaskTitle("");
  };

  return <div>
    <input
      value={newTaskTitle}
      onChange={onNewTitleChangeHandler}
      onKeyUp={onKeyPressHandler}
      className={error ? 'error' : ""}
    />
    <button onClick={addTask}>+</button>
    {error && <div className='error-message'>{error}</div>}

  </div>;
}
