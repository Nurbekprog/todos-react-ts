import React from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Draggable } from '@hello-pangea/dnd'

interface Props {
    todo: Todo;
    todoArr: Todo[];
    setTodoArr: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
    handleDone(id: string): void
}

const SingleTodoComponent: React.FC<Props> = ({ index, todo, todoArr, setTodoArr, handleDone }) => {

    const [edit, setEdit] = React.useState(false)
    const [editTodo, setEditTodo] = React.useState(todo.todo)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    const handleDelete = (id: string) => {
        setTodoArr(todoArr.filter(todoItem =>
            todoItem.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: string) => {
        e.preventDefault()
        setTodoArr(todoArr.map(todoItem => (
            todoItem.id === id ? {
                ...todoItem,
                todo: editTodo
            }
                :
                todoItem
        )))
        setEdit(false)
    }

    return (
        <Draggable index={index} draggableId={todo.id} key={todo.id}>
            {
                (provided,snapshot) => (
                    <form className={`todos_single ${snapshot.isDragging ? 'drag': ''} ${todo.isDone ? 'done' : ''}`} onSubmit={(event) => handleEdit(event, todo.id)} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                        {
                            edit ? (
                                <input ref={inputRef} type="text" value={editTodo} onChange={(event) => setEditTodo(event.target.value)} />
                            )
                                :
                                (
                                    <span className={`todos_single_text ${todo.isDone ? 'done' : ''}`}>{todo.todo}</span>
                                )
                        }
                        <div>
                            <span className={`icon ${todo.isDone ? 'done' : ''}`} onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(edit => !edit)
                                }
                            }
                            }><AiFillEdit /></span>
                            <span className={`icon ${todo.isDone ? 'done' : ''}`} onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
                            <span className={`icon ${todo.isDone ? 'done' : ''}`} onClick={() => handleDone(todo.id)}><MdDone /></span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodoComponent
