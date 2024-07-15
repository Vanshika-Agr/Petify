import React, { useEffect, useState } from 'react';
import { Box, Image, Flex, Text, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

const petData = [
  {
    name: 'Buddy',
    image: 'https://cdn.shopify.com/s/files/1/0197/6814/8032/files/beagle_large.jpg?v=1572629393',
    description: 'Friendly and energetic dog looking for a loving home.',
    fact: 'Dogs can learn more than 1000 words!',
  },
  {
    name: 'Mittens',
    image: 'https://d2zp5xs5cp8zlg.cloudfront.net/image-83814-800.jpg',
    description: 'Calm and affectionate cat ready to cuddle.',
    fact: 'Cats can rotate their ears 180 degrees.',
  },
  {
    name: 'Chirpy',
    image: 'https://www.thoughtco.com/thmb/JsfFOm7ViQvLMfFDgiJ6LzmODGw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-128105870-589cfe9f5f9b58819c7385d1.jpg',
    description: 'Happy and singing bird needing a new friend.',
    fact: 'Birds are the only animals with feathers.',
  },
  // Add more pets as needed
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % petData.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + petData.length) % petData.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box maxW="1200px" mx="auto" my={6} position="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Flex
            position="relative"
            width="97%"
            height="300px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            marginX={4}
            justifyContent="center"
            alignItems="center"
            shadow="2xl"
          >
            {/* Left half - Image */}
            <Box width="50%" height="100%" zIndex={2}>
              <Image
                src={petData[index].image}
                alt={petData[index].name}
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Box>

            {/* Right half - Text */}
            <Box width="50%" height="100%" display="flex" flexDirection="column" justifyContent="center" bg="gray.200" p={4} zIndex={2}>
              <Box marginLeft="50px">
                <Text fontWeight="bold" fontSize="4xl">
                  {petData[index].name}
                </Text>
                <Text mt={2}>{petData[index].description}</Text>
                <Text mt={2} fontStyle="italic" color="gray.700">
                  {petData[index].fact}
                </Text>
              </Box>
            </Box>
          </Flex>
        </motion.div>
      </AnimatePresence>
      <Flex
        position="absolute"
        bottom="-50px"
        left="50%"
        transform="translateX(-50%)"
        zIndex={3}
      >
        <VStack
          margin="10px"
          fontWeight="bold"
          borderRight="2px solid white"
          bg="gray.300"
          p={4}
          borderRadius="md"
          padding="10px"
          opacity="0.8"
          border="2px solid white"
          shadow="2xl"
        >
          <Box>
            <CountUp start={0} end={200} duration={3} />
          </Box>
          <Box>Waiting for home</Box>
        </VStack>
        <VStack
          margin="10px"
          fontWeight="bold"
          borderRight="2px solid white"
          bg="gray.300"
          p={4}
          borderRadius="md"
          padding="10px"
          opacity="0.8"
          border="2px solid white"
          shadow="2xl"
        >
          <Box>
            <CountUp start={0} end={100} duration={3} />
          </Box>
          <Box>Adopted last year</Box>
        </VStack>
        <VStack
          margin="10px"
          fontWeight="bold"
          bg="gray.300"
          p={4}
          borderRadius="md"
          padding="10px"
          opacity="0.8"
          border="2px solid white"
          shadow="2xl"
        >
          <Box>
            <CountUp start={0} end={50} duration={3} />
          </Box>
          <Box>Rescued pets</Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Carousel;
