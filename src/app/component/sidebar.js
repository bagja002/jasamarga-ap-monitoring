import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { styled } from "@mui/material/styles";

import Link from "next/link";

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

const Sidebar = () => {
  return (
    <div style={{ position: "relative", top: "100px" }}>
      <Sliderbar>
        <List style={{ color: "white" }}>
          <ListItem>
            <Link style={DashboardStyle} href="/admin/dashboard">
              <ListItemText style={CenteredText} primary="dashboard" />
            </Link>
          </ListItem>
          <ListItem>
            <Link style={ReportStyle} href="/admin/report">
              <ListItemText style={CenteredText} primary="report" />
            </Link>
          </ListItem>
          <ListItem>
            <Link style={UserStyle} href="/admin/users">
              <ListItemText style={CenteredText} primary="Users" />
            </Link>
          </ListItem>
          <ListItem>
            <Link style={ProfileStyle} href="/admin/profile">
              <ListItemText style={CenteredText} primary="Profile" />
            </Link>
          </ListItem>
        </List>
      </Sliderbar>
    </div>
  );
};

export default Sidebar;