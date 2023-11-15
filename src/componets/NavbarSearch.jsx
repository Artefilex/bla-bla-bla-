// import { searchBooks } from "@/api/search";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Button } from "@mui/material";
function NavbarSearch() {
  const [searchFilter, setSearchFilter] = useState("");
  const handleSearch = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchFilter("");
  };

console.log(searchFilter)
  return (
    <form style={{display:"flex" , alignItems:"center", justifyContent:"center" , border:"1px solid white", borderRadius:"4px" }} onSubmit={handleSubmit}>
      <input
        placeholder="Search…"
        value={searchFilter}
        onChange={handleSearch}
       
       style={{
        border:"none",
        outline:"none",
        background:"transparent",
        padding:"1rem 0.5rem",
       color:"white"
       }}
      />
      <Button type="submit" color="inherit">
        <SearchIcon />
      </Button>
    </form>
  );
}

export default NavbarSearch;
