import { AccountCircle, Logout } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useFetchUser } from "../lib/user";

export const UserMenu: React.FC = () => {
  const { user } = useFetchUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!user) {
    return null;
  }
  return (
    <>
      <Chip
        color="secondary"
        onClick={handleClick}
        avatar={<Avatar alt={user.name || ""} src={user.picture || ""} />}
        label={user.name}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link
          href="/profile"
          color="text.primary"
          sx={{ textDecoration: "none" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>{" "}
            Profile
          </MenuItem>
        </Link>
        <MenuItem onClick={() => (window.location.href = "/api/logout")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
