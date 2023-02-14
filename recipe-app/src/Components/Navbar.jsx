import {
  Box,
  Hide,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import "./styles/navbar.css";



const links = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/signup",
    title: "Signup",
  },
  {
    link: "/recipe",
    title: "Added Recipe",
  },
];

const Navbar = () => {
  return (
    <Box className="nav_container">
      {links.map((el, i) => {
        return (
          <Link key={i} to={el.link}>
            {el.title}
          </Link>
        );
      })}
      <Dropdown length={links.length} />
    </Box>
  );
};

export default Navbar;
