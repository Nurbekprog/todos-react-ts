import React from 'react'
import './styles.css'

interface Props {
    todo:string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) =>void
}
const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <form className="input" onSubmit={(event) => {
      handleAdd(event)
      inputRef.current?.blur()
    }}>
        <input 
          ref={inputRef} 
          type="input" 
          value={todo} 
          onChange={(e) => setTodo(e.target.value)} 
          placeholder="Enter a task" className="input__box" />
        <button className="input__submit" type="submit">GO</button>
    </form>
  )
}

export default InputField