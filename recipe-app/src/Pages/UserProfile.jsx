import React from "react";
import { Box, Image, Heading } from "@chakra-ui/react";
import "./styles/common.css";
import { useUserAuth } from "../Context/AuthContext";
const UserProfile = () => {
  const { user } = useUserAuth();

  const payload = {
    name: user.displayName,
    email: user.email,
    img: user.photoURL,
  };

  console.log("UserDtae", user);
  return (
    <Box className="data_container user_container">
      <Heading>User Data</Heading>
      <Heading as="h3" size="md">
        Name : {user.displayName}
      </Heading>
      <Heading as="h3" size="md">
        email : {user.email}
      </Heading>
    </Box>
  );
};

export default UserProfile;
