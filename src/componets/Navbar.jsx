
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect ,useState } from "react";
import NavbarSearch from "./NavbarSearch";
export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null)
  
  useEffect(()=>{
    const userStorege =  localStorage.getItem("user")
    setUser(JSON.parse(userStorege))
   },[])
   const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
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
