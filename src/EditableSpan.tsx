import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string;
  changeTask: (value: string) => void
};

export function EditableSpan(props: EditableSpanPropsType) {
  let [editState, setEditState] = useState<boolean>(false);
  let [title, setTitle] = useState<string>("");

  function onChange(e: ChangeEvent<HTMLInputElement>){
    setTitle(e.currentTarget.value);
  }
  function onSetEditState(){
    setEditState(true);
  }
  function onSetViewState(){
    setEditState(false);
    props.changeTask(title);
  }

  return editState
    ?<input value={title} onBlur={onSetViewState} onChange={(e) => onChange(e)} autoFocus></input>
    :<span onDoubleClick={onSetEditState}>{props.title}</span>
}
