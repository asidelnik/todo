import { useState } from 'react'
import './App.css'
import { ITodo } from './interfaces/ITodo';

function App() {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  function addTodo() {
    setTodos([...todos, { name: todo, isCompleted: false }])
    setTodo('');
  }

  function removeTodo(name: string) {
    const index = todos.findIndex(t => t.name === name);
    if (index !== -1) {
      const newArray = [...todos.slice(0, index), ...todos.slice(index + 1)];
      setTodos(newArray);
    }
  }

  function handleTodoComplete(item: ITodo) {
    const updated = todos.map(t => {
      if (t.name === item.name) {
        return {...t, isCompleted: !t.isCompleted};
      }
      return t;
    })
    setTodos(updated);
  }

  return (
    <>
      <input type="text" name='todo' onChange={e => setTodo(e.target.value)} value={todo} />
      <button onClick={addTodo}>Add</button>

      <div>
        <h3>Todos list</h3>
        <ul>
          {todos.map((t: ITodo, index: number) => {
            return (
              <li key={index} className='task-item'>
                <input type="checkbox" name="isCompleted"
                  checked={t.isCompleted}
                  onChange={() => handleTodoComplete(t)} />
                <p>{t.name}</p>
                <button onClick={() => removeTodo(t.name)}>Remove</button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
