import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { styled } from "@mui/material/styles";

import Link from "next/link";
import { useRouter } from 'next/router';

const Sliderbar = styled("div")({
  backgroundColor: "rgba(42, 42, 45, 1)",
  borderRadius: "30px",
  width: "250px",
  height: "843px",
  position: "fixed",
  left: "50px",
  "@media (max-width: 1600px)": {
    // Styles for tablet
    width: "220px",
  },
  "@media (max-width: 1366px)": {
    // Styles for HD laptop
    width: "180px",
  },
  "@media (max-width: 1920px)": {
    // Styles for Full HD laptop
    width: "260px",
  },
});

const listItemStyles = {
  backgroundColor: "rgba(41, 130, 235, 1)",
  borderRadius: "15px",
  width: "219px",
  height: "58px",
  position: "absolute",
  left: "20px",
};

const DashboardStyle = {
  ...listItemStyles,
  top: "263px",
};

const ReportStyle = {
  ...listItemStyles,
  top: "323px",
};

const UserStyle = {
  ...listItemStyles,
  top: "383px",
};

const ProfileStyle = {
  ...listItemStyles,
  top: "443px",
};

const CenteredText = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  color: "white",
};

const buttonStyle = {
  backgroundColor: "#FF0000", // Green background
  border: "none",
  color: "white",
  padding: "10px 50px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "12px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  position: "absolute", // Fixed position
  bottom: "100px", // 20px from the bottom
  left: "50px"
};

const SidebarUser = () => {

  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage or any other state storage you use
    localStorage.clear();

    // Redirect to the login page
    router.push('/users/login');
  };



  return (
    <div style={{ position: "relative", top: "100px" }}>
      <Sliderbar>
        <List style={{ color: "white" }}>
          <ListItem>
            <Link style={DashboardStyle} href="/users/dashboard">
              <ListItemText style={CenteredText} primary="Dashboard" />
            </Link>
          </ListItem>
          <ListItem>
            <Link style={ReportStyle} href="/users/komitmen/komitmen">
              <ListItemText style={CenteredText} primary="Komitmen" />
            </Link>
          </ListItem>
          <ListItem>
            <Link style={UserStyle} href="/users/realisasi-belanja/realisasi-belanja">
              <ListItemText style={CenteredText} primary="Realisasi Belanja" />
            </Link>
          </ListItem>
          <ListItem>
            <Link style={ProfileStyle} href="/users/profile">
              <ListItemText style={CenteredText} primary="Profile" />
            </Link>
          </ListItem>
        </List>
        <button style={buttonStyle} onClick={handleLogout}>Logout</button>
      </Sliderbar>
    </div>
  );
};

export default SidebarUser;