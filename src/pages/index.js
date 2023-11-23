import {Grid} from '@mui/material';
import axios from 'axios';
import { useEffect , useState } from 'react';
import CardComponent from "../componets/CardComponet.jsx"
import Navbar from '@/componets/Navbar.jsx';
import TodoList from '@/componets/todolist/index.jsx';
export default function Home() {
 
  const [books, setBooks] = useState([]);

  useEffect(() => {  
    const fetchData = () =>{
    setTimeout(()=>{
      axios.get('http://localhost:3001/books')
      .then((response) => {
        
        setBooks(response.data);
      })
      .catch((error) => console.error('error :>> ', error));
    },1000)
    }
    fetchData()
  }, []);

  // const filterBooks = books.filter((item) => item.id === 1)
  // console.log(filterBooks)



  return (
   
   <>
   <Navbar/> 
   
    <Grid container spacing={2}>
   
    {books &&
      books.map((book) => (
        <Grid item key={book.id} xs={12} sm={6} md={4}>
        <CardComponent imageUrl={book.imageUrl} title={book.title} description={book.description}  id={book.id}   />
        </Grid>
      ))}
  </Grid>
   
  
   </>
  )
}
