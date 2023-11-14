import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

function CardComponet({ imageUrl, title ,description , id  }) {
  const router = useRouter() 
  
  
  return (
    <Card sx={{ minHeight:"500px"  ,maxWidth: "370px" , marginTop:"1rem" , position:"relative"}}>  
        <CardMedia
          component="img"
          height="140"
          image={imageUrl ?? "https://picsum.photos/200/300"}
          alt={title}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}...
          </Typography>
        </CardContent>
        <CardActions sx={{paddingTop:"2rem", position:"absolute" , bottom:"0"}}>
          <Button
            variant="contained"
            size="small"
            onClick={() => router.push(`/books/${id}`)}
            component="span"
          >
            Details
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={() => router.push(`/edit-books/${id}`)}
            component="span"
          >
            Edit
          </Button>
        
        </CardActions>
   
    </Card>
  );
}

export default CardComponet;
