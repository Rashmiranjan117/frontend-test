import React, { useEffect, useState } from "react";
import { Box, useToast, Image, Heading, Text, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ModalDisplay from "../Components/ModalDisplay";
import "./styles/common.css";
import {
  getSavedRecipeFailure,
  getSavedRecipeRequest,
  getSavedRecipeSuccess,
} from "../Redux/RecipeReducer/action";
const AddedRecipes = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector((store) => store.RecipeReducer.savedlist);
  let fav_recipe = JSON.parse(localStorage.getItem("fav_recipe")) || [];
  // console.log(fav_recipe);
  const [selectedRecipe, setSelectedTecipe] = useState(
    JSON.parse(localStorage.getItem("fav_recipe")) || []
  );
  const toast = useToast();
  const handleDelete = (id) => {
    let updatedRecipe = fav_recipe.filter((el) => {
      return el.id !== id;
    });
    localStorage.setItem("fav_recipe", JSON.stringify(updatedRecipe));
    fav_recipe = updatedRecipe;
    setSelectedTecipe(updatedRecipe);
    toast({
      status: "success",
      title: "Element Deleted Successfully",
      isClosable: true,
      duration: 5000,
      position: "bottom",
    });
    console.log("last", selectedRecipe);
  };
  useEffect(() => {}, [selectedRecipe]);

  return (
    <>
    <Heading>Saved Items</Heading>
    <Box className="data_container recipe_container">
      {fav_recipe &&
        fav_recipe?.map((el, i) => {
          return (
            <Box key={el.id + i}>
              <Image
                src={el.img}
                alt={el.title}
                style={{ aspectRatio: "3/2", objectFit: "contain" }}
              />
              <Heading as="h4" size="md">
                {el.title}
              </Heading>
              <Text>Cuisine : {el.cuisine}</Text>

              <Button
                colorScheme="red"
                variant="outline"
                m={4}
                onClick={() => handleDelete(el.id)}
              >
                Delete
              </Button>
              <ModalDisplay el={el} />
            </Box>
          );
        })}
    </Box></>
  );
};

export default AddedRecipes;
