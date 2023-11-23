
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useEffect ,useState } from "react";
import NavbarSearch from "./NavbarSearch";
import { searchBooks } from "@/api/search";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "@/store/usersSlice";
export default function Navbar() {
  const router = useRouter();
const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

   const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logOutUser())
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
       
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => router.push("/add-book")}
              variant="text"
              sx={{
                color: "white",
              }}
            >
              Add Book
            </Button>
            <Button
              onClick={() => router.push("/todo")}
              variant="text"
              sx={{
                color: "white",
              }}
            >
              Todo
            </Button>
          </Typography>
          <NavbarSearch/>
    {
      user ? (
        <Button color="inherit" onClick={handleLogout}> Log out</Button>
      ): (      
        <Button 
        onClick={() => router.push("/login")}
         color="inherit">
        Login</Button> 
      )
    }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
