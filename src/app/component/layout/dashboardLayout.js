import React from "react";
import Container from "@mui/material/Container";

const Layout = ({ children }) => {
  return (
    <Container style={{background:"red"}} maxWidth="lg"> {/* maxWidth="lg" sesuai dengan resolusi 1980x1080 */}
      {children}
    </Container>
  );
};

export default Layout;
