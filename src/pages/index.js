import {Grid} from '@mui/material';
import axios from 'axios';
import { useEffect , useState } from 'react';
import CardComponent from "../componets/CardComponet.jsx"
import Navbar from '@/componets/Navbar.jsx';
export default function Home() {
 
  const [books, setBooks] = useState([]);

  useEffect(() => {  
    axios.get('http://localhost:3001/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error('error :>> ', error));
  }, []);

  



  return (
   
   <>
   <Navbar/>
    {/* <Link href="/add-book">
    <Button variant="contained" color="primary">
      Add Book
    </Button>
  </Link> */}
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
