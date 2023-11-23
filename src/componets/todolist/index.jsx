import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTodos, addTodoAsync, removeTodoAsync, removeAllTodos, updateTodo, getTodo } from "@/store/todoSlice"
import axios from "axios"
export default function TodoList(){
const dispatch = useDispatch()
 const {todos} = useSelector((s)=> s.todos)
const [todoText, setTodoText] = useState("")
 
const handleAddTodo = () =>{
    if (!todoText.trim()) return;
    dispatch(addTodoAsync({ title: todoText 
    }));
    setTodoText('');
 }
useEffect(()=>{
    //  dispatch(fetchTodos())
    //  
   const users =  async () => {
    const response = await axios.get( 'https://jsonplaceholder.typicode.com/todos/' );
     localStorage.setItem("todos", JSON.stringify(response.data))
    }
   users()
   dispatch(getTodo())
    },[dispatch])
   
  const handleRemove = (todoId) => {
    dispatch(removeTodoAsync(todoId));
  };
const handleChangeStatus = (complated) =>{
   dispatch(updateTodo(complated))
 }
  const handleRemoveAllTodos = () => {
    dispatch(removeAllTodos());
  };
    return(
        <div style={{marginTop:"2rem" }}> 
      <input
        type="text"
        placeholder="Add New Todo"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleRemoveAllTodos}>Delete All Todos</button> 
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} {todo.title}
            <button onClick={() => handleRemove(todo.id)}>Delete </button>
            <button onClick={()=>handleChangeStatus({
                id : todo.id , 
                completed: todo.completed
            }) }> Change Status </button>
          </li>
        ))}
      </ul>
    </div>
    )
}