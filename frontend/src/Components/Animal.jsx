import React from 'react'
import {
    Box,
    Button,
    Flex,
    HStack,
    Image,
    Heading,
    Text,
    VStack,
    
  } from "@chakra-ui/react";
function Animal() {
  return (
    <>
      <HStack marginTop={'20px'}>
        <Image src={'https://media.istockphoto.com/id/1296353202/photo/group-of-pets-posing-around-a-border-collie-dog-cat-ferret-rabbit-bird-fish-rodent.jpg?s=612x612&w=0&k=20&c=l4UJze9hXcNABS_3QJcaOU07R1pcuV3L7w_IJTu9o2c='}
        height={'45%'}
        width={'45%'}

        />
        <VStack>
        <Text fontSize={'xx-large'} fontWeight={'bold'} margin={'10px'}>Why to Adopt?</Text>
        <Text >Lorem ipsum dolor sit amet consectetur adipisicing elit. At laborum iure, pariatur tempora nemo neque modi itaque necessitatibus amet molestiae beatae eius magnam harum corporis unde officiis maiores, tenetur ratione!amet molestiae beatae eius magnam harum corporis unde officiis maiores, tenetur ratione</Text>
        </VStack>
      </HStack>
    </>
  )
}

export default Animal
