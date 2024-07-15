import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Heading,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addpostid, addtoken } from "../Store/Slice/Userslice";
import Carousel from "./Carousel";
import Typewriter from "typewriter-effect";
import Animal from "./Animal";

const Dashboard = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const dispatch = useDispatch();
  let admin = "";
  let token = localStorage.getItem("token");
  dispatch(addtoken(token));
  const id = useSelector((state) => state.userdata._id);

  async function findPosts() {
    try {
      const res = await axios
        .get("http://localhost:8080/api/v2/getAllPosts")
        .catch((err) => console.log(err));
      if (!res) {
        navigate("/login");
      }
      const data = res.data.allposts;
      return data;
    } catch (error){
      console.log(error);
      return [];
    }
  }

  const handleclick = (id) => {
    dispatch(addpostid(id));
    navigate(`/singlepost/${id}`);
  };

  const findadmin = async () => {
    let res = await axios
      .get(` http://localhost:8080/api/v1/getuser/${id}`)
      .catch((error) => console.log(error));
    return res.data.user;
  };

  useEffect(() => {
    findadmin()
      .then((data) => setuser(data))
      .catch((error) => console.log("Findadmin failed"));
    findPosts()
      .then((data) => setPost(data))
      .catch((err) => console.log("findPosts failed"));
  }, []);

  return (
    <>
      <Carousel />
      <VStack
        id="add"
        width="90%"
        height="100%"
        // overflowY="auto"
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
        marginY="80px"
        marginX="auto"
        // overflow={'scroll'}
        
      >
        
        <HStack position={'relative'}  spacing={8} width={'90%'}>
        <Image
            src={'https://img.icons8.com/?size=48&id=v4AIFGxhL1lB&format=png'} 
            height={'70px'}
            width={'70px'}
            margin={'20px'}
            align={'start'}
          
            />
        
        <Box display="flex" justifyContent="center" mx="auto" mb="10px" width={'85%'} >
          <Text
            fontSize={{ base: "sm", sm: "4xl" }}
            fontWeight="semibold"
            color="black"
            fontFamily="serif"
          >
            
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 50,
                strings: ["Adopt your new bestfriend!"],
              }}
            />
          </Text>
        </Box>
        <Image
            src={'https://img.icons8.com/?size=48&id=v4AIFGxhL1lB&format=png'} 
            height={'70px'}
            width={'70px'}
            margin={'20px'}
            align={'start'}
          
            />
        </HStack>
        <HStack className="" overflow="auto" overflowY={'hidden'} height={'20%'} width={'95%'} spacing={6} padding={'10px'} >
          {post.map((posts, index) => (
            <Box
              key={index}
              boxShadow="lg"
              borderRadius="lg"
              // overflow="hidden"
              position="relative"
              minW="200px"
              maxW="200px"
              height="300px"
              bg="white"
              // border="2px solid gray"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Image
                objectFit="cover"
                width="100%"
                height="50%"
                src={`${posts.image}`}
                alt="Post Image"
                padding={'5px'}
                rounded={'xl'}
                // shadow="xl"
              />
              <VStack
                align="center"
                spacing={2}
                flex="1"
                p={4}
                justify="space-between"
                height="50%"
                
              >
                <Box height={'50%'} paddingTop={'3px'} >
                  <Heading size="md">{posts.name}</Heading>
                  <Text fontSize="lg" color="gray.500">
                    {posts.categories}
                  </Text>
                  <Text fontSize="sm" overflow={'auto'}>
                    {posts.content.split(" ").slice(0, 10).join(" ")}...
                  </Text>
                </Box>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  width="full"
                  size="sm"
                  onClick={() => handleclick(posts._id)}
                >
                  Adopt me
                </Button>
              </VStack>
            </Box>
          ))}
        </HStack>
      <Animal/>
      </VStack>
    </>
  );
};

export default Dashboard;
