import React from "react";
import { Routes, Route } from "react-router-dom";
import AddedRecipes from "../Pages/AddedRecipes";
import Home from "../Pages/Home";

import Signup from "../Pages/Signup";
import UserProfile from "../Pages/UserProfile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/recipe" element={<AddedRecipes />} />
    </Routes>
  );
};

export default AllRoutes;
