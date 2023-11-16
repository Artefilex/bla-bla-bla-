

import { Button, CardMedia, Container, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function DeleteItem() {
const [book ,setBook] = useState(null) 
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {  
        const fetchData = () =>{
        setTimeout(()=>{
          axios.get(`http://localhost:3001/books/${id}`)
          .then((response) => {
            setBook(response.data);
          })
          .catch((error) => console.error('error :>> ', error));
        },1000)
        }
        fetchData()
      }, [id]);
    
    const handleDelete = async () => {
        try {
            
            await axios.delete(`http://localhost:3001/books/${id}`);
            router.push('/');
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Failed to delete book');
        }
    }

  return(<>
  
 {
    book && <div style={{display:"flex", flexDirection:"column",  alignItems:"center" , justifyContent:"center" , width:"100%", height:"100vh"}}>
    <Container>
         <CardMedia   
           component="img"
           src={book.imageUrl ?? 'https://picsum.photos/200/300'}
           alt={book.title}
           loading="lazy"
           width="340"
           height="400"
          
         />
         <Typography variant="h4">{book.title}</Typography>
         <Button color="primary" variant="contained" fullWidth onClick={handleDelete}  >
       Delete Book
      </Button>
       </Container>
    
     </div>  
 }  
 </>
  )
}

export default DeleteItem;