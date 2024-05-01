import React from "react";
import './App.css'
import InputField from "./components/InputField";
import { Todo } from "./model";
import { nanoid } from "nanoid";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from '@hello-pangea/dnd'

// const TodoReducer = (todos: Todo[], action: Actions) => {
//   switch (action.type) {
//     case 'add':
//       return [
//         ...todos, {id: nanoid(), todo: action.payload, isDone: false}
//       ]
//     case 'delete':
//       return todos.filter(todoItem => todoItem.id !== action.payload)
//     case 'done':
//       return todos.map(todoItem => todoItem.id === action.payload ? {...todoItem, isDone: !todoItem.isDone} : todoItem )
//   }
// }

const App: React.FC = () => {

  const [todo, setTodo] = React.useState("")
  //Array of TODOs
  const [todoArr, setTodoArr] = React.useState<Todo[]>(JSON.parse(localStorage.getItem("todoArray")) || [])

  // const [todos, dispatch] = React.useReducer(TodoReducer, [])

  React.useEffect(() => {
    localStorage.setItem("todoArray", JSON.stringify(todoArr))
  }, [todoArr])

  const [completedTodos, setCompletedTodos] = React.useState<Todo[]>([])

  React.useEffect(() => {
    const compTD: Todo[] = todoArr.filter(item => item.isDone)
    setCompletedTodos(compTD)
  }, [])
  
  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (todo) {
      setTodoArr([...todoArr, {id: nanoid(), todo, isDone: false}])
      setTodo("")
    }
    
  }

  function handleDone(id: string) {
    
    const newTD: Todo[] = todoArr.map(oldTodoItem => {
      return oldTodoItem.id === id ? {
          ...oldTodoItem,
          isDone: !oldTodoItem.isDone
      }
          : oldTodoItem
  })

    setCompletedTodos(newTD)
    setTodoArr(newTD)
}
  
  const handleDragEnd = (result: DropResult) => {
    const {source, destination} = result

    if (!destination) return
    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    let add
    const activeTodos = todoArr
    const complete = completedTodos

    if(source.droppableId === 'TodosList') {
      add = activeTodos[source.index]
      activeTodos.splice(source.index, 1)
    }
    else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === 'TodosList') {
      add.isDone = false
      activeTodos.splice(destination.index, 0, add)
    }
    else {
      add.isDone = true
      completedTodos.splice(destination.index, 0, add)

    }

    setCompletedTodos(complete)
    setTodoArr(activeTodos)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <div className="App">
      <span className="heading">TASKIFY - The Todo App you need</span>
      <InputField todo={todo} setTodo ={setTodo} handleAdd={handleAdd}/>
      <TodoList todoArr={todoArr} setTodoArr={setTodoArr} completedTodos={completedTodos} handleDone={(handleDone)}/>
    </div>
    </DragDropContext>
  )
}

export default App
