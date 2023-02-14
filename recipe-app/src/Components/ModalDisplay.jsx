import React, { useEffect, useState } from "react";
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
  Link,
  Flex,
} from "@chakra-ui/react";
import { BiLink } from "react-icons/bi";

import {
  getSavedRecipeFailure,
  getSavedRecipeRequest,
  getSavedRecipeSuccess,
} from "../Redux/RecipeReducer/action";
import { useDispatch, useSelector } from "react-redux";
const ModalDisplay = ({ el }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  let fav_recipe = JSON.parse(localStorage.getItem("fav_recipe")) || [];
  const selectedData = useSelector((store) => store.RecipeReducer.savedlist);
  const toast = useToast();
  const [selectedRecipe, setSelectedTecipe] = useState(
    JSON.parse(localStorage.getItem("fav_recipe")) || []
  );
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
  console.log("Selected Data", fav_recipe);
  useEffect(() => {
    console.log("SelectedData", selectedData);
  }, [selectedData.length]);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        More Details
      </Button>

      <Modal
        closeOnOverlayClick={true}
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{el.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6}>
            <Image
              src={el.img}
              alt={el.title}
              style={{ aspectRatio: "3/2", objectFit: "contain" }}
            />
            <Text>
              <strong>Description : </strong>
              {el.description}
            </Text>
            <Flex gap={1}>
              <Link href={el.recipe_link} isExternal>
                <strong>Recipe Link </strong>
              </Link>
              <BiLink />
            </Flex>
            <Text>
              <strong>Ingridients :</strong>
            </Text>
            <ul>
              {el?.ingredients.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handlePost(el)}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDisplay;
