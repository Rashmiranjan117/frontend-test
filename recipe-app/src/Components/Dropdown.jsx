import React, { useState, useEffect } from "react";
import { useUserAuth } from "../Context/AuthContext";
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
import { useNavigate, Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const Dropdown = ({ length }) => {
  const { user, logOut } = useUserAuth();
  const [val, setVal] = useState("");
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setVal(user?.displayName || "");
  }, [user, val]);
  console.log("user from dropdown", val);

  return (
    <Box display={user ? "block" : "none"}>
      {user ? (
        <Menu>
          <MenuButton as={Button} bgColor="#537FE7" color="#E9F8F9">
            <span className="text_color">
              {val === undefined ? "My Account" : val}
            </span>
          </MenuButton>
          <MenuList>
            <MenuItem minH="48px" onClick={() => navigate("/user")}>
              <Image
                boxSize="2rem"
                borderRadius="full"
                src="https://fastly.picsum.photos/id/994/200/200.jpg?hmac=a0dwH_eftBXVmeonrMy5xNmGDPwiXgXrzUjjUQLEtR8"
                alt="Fluffybuns the destroyer"
                mr="12px"
              />
              <span className="text_color">Account Details</span>
            </MenuItem>
            <MenuItem
              minH="40px"
              display="flex"
              color="red"
              _hover={{ backgroundColor: "red", color: "white" }}
              onClick={() => {
                handleSignOut();
              }}
            >
              <CiLogout fontSize="1.8rem" />
              <span style={{ marginLeft: "20px" }}>Logout</span>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Link key={length + 1} to="/user">
          <span className="text_color">User</span>
        </Link>
      )}
    </Box>
  );
};

export default Dropdown;
