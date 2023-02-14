import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getSavedRecipeFailure,
  getSavedRecipeRequest,
  getSavedRecipeSuccess,
} from "../Redux/RecipeReducer/action";

import {
  Box,
  Heading,
  Image,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  getRecipeFailure,
  getRecipeRequest,
  getRecipeSuccess,
} from "../Redux/RecipeReducer/action";
import { useDispatch, useSelector } from "react-redux";
import "./styles/common.css";
import ModalDisplay from "../Components/ModalDisplay";

const getData = () => {
  return axios.get("https://mock-4-api-ntyy.onrender.com/recipe");
};

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let data = useSelector((store) => store.RecipeReducer.list);
  const [selectedRecipe, setSelectedTecipe] = useState(
    JSON.parse(localStorage.getItem("fav_recipe")) || []
  );
  // let fav_recipe = JSON.parse(localStorage.getItem("fav_recipe")) || [];
  const selectedData = useSelector((store) => store.RecipeReducer.savedlist);
  const toast = useToast();
  console.log(selectedRecipe);

  const handlePost = (el) => {
    let updatedRecipe = [...selectedRecipe, el];
    setSelectedTecipe(updatedRecipe);
    const storedRecipe = JSON.parse(localStorage.getItem("fav_recipe")) || [];
    const newRecipe = [...storedRecipe, el];
    localStorage.setItem("fav_recipe", JSON.stringify(newRecipe));
    toast({
      status: "success",
      title: "Recipe added to List.",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };
  // console.log("Selected Data", selectedRecipe);

  // console.log("Data", data);

  const handleGet = () => {
    setLoading(true);
    dispatch(getRecipeRequest());
    getData()
      .then((res) => {
        setLoading(false);
        dispatch(getRecipeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getRecipeFailure());
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGet();
  }, []);

  if (loading === true)
    return (
      <Box className="data_container">
        <Heading>Loading...</Heading>;
      </Box>
    );
  return (
    <>
      <Heading mt={3}>Recipies</Heading>
      <Box className="data_container recipe_container">
        {data &&
          data?.map((el, i) => {
            return (
              <Box key={el.id}>
                <Image src={el.img} alt={el.title} />
                <Heading as="h4" size="md">
                  {el.title}
                </Heading>
                <Text>Cuisine : {el.cuisine}</Text>

                <Button colorScheme="blue" m={4} onClick={() => handlePost(el)}>
                  Save
                </Button>
                <ModalDisplay el={el} />
              </Box>
            );
          })}
      </Box>
    </>
  );
};

export default Home;
