import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Image from "next/image";
import JSMRS from "../component/assets/Jasamargapng.png";



const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{   display: "flex", background: "transparent", boxShadow: "none", backdropFilter: "blur(10px)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "400px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px" }}>
          <Image src={JSMRS} alt="Ii gambar" layout="responsive" width={400} height={100} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
