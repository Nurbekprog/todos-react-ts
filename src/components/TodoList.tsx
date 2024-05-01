import React from "react"
import {  Todo } from "../model"
import { nanoid } from "nanoid";
import './styles.css'
import SingleTodoComponent from "./SingleTodoComponent";
import { Droppable } from '@hello-pangea/dnd';

interface Props {
  todoArr: Todo[];
  setTodoArr: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[]
  handleDone (id: string): void
}

const TodoList: React.FC<Props> = ({ todoArr, setTodoArr, completedTodos, handleDone }) => {

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {
          (provided, snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver ? 'dragActive' : ''}`} ref={provided.innerRef} 
            {...provided.droppableProps}>
              <span className="todos_heading">Active Tasks</span>
              {todoArr.map((todo, index) => {
                return  snapshot.isDraggingOver ? (<SingleTodoComponent
                  index={index}
                  todo={todo}
                  key={nanoid()}
                  todoArr={todoArr}
                  setTodoArr={setTodoArr}
                  handleDone={handleDone}
                />)
                : (
                  !todo.isDone && <SingleTodoComponent
                  index={index}
                  todo={todo}
                  key={nanoid()}
                  todoArr={todoArr}
                  setTodoArr={setTodoArr}
                  handleDone={handleDone}
                />
                )
              })}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {
          (provided, snapshot) => (
            <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
              <span className={`todos_heading ${snapshot.isDraggingOver ? 'dragremove' : ''}`}>Completed Tasks</span>
              {completedTodos.map((todo,index) => {
                return snapshot.isDraggingOver ? (<SingleTodoComponent
                  index={index}
                  todo={todo}
                  key={nanoid()}
                  todoArr={completedTodos}
                  setTodoArr={setTodoArr}
                  handleDone={handleDone}
                />)
                : (
                  todo.isDone && <SingleTodoComponent
                  index={index}
                  todo={todo}
                  key={nanoid()}
                  todoArr={completedTodos}
                  setTodoArr={setTodoArr}
                  handleDone={handleDone}
                />
                )
              })}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
}

export default TodoList
