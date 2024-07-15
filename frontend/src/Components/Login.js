import {
  Box,
  Input,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Typewriter from 'typewriter-effect'
import React, { useEffect, useState } from "react";
import { GiSittingDog } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoken } from "../Store/Slice/Userslice";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  
  const dipatch = useDispatch();
  const navigation = useNavigate();
  const submithandler = async () => {
    try {
      let res = await axios.post(
        " http://localhost:8080/api/v1/login",
        {
          email: username,
          password: password,
        },
        { withCredentials: true }
      );
      let data = res.data;
      
      dipatch(addtoken(data));


      localStorage.setItem("token",data)
      navigation("/dashboard");
    } catch (error) {
      console.log(error);
      setpassword("");
      setusername("");
    }
  };

  const handlepassword = (e) => {
    setpassword(e.target.value);
  };
  const handleusername = (e) => {
    setusername(e.target.value);
  };
  useEffect(()=>{
    localStorage.clear()
  },[])
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom:"50px"
      }}
    >
      <HStack spacing={50} className="">
         {/* <h1 className="text-3xl text-white-500 font-semibold font-serif sm:text-3xl mt-10">
                                <Typewriter
                                    options={{
                                    autoStart:true,
                                    loop:true, 
                                    delay:50,
                                    strings: ["Find Your New Friends!"] 
                                    }}
                                />
                                
                            </h1> */}
        <Box display="flex" justifyContent="center" alignItems="center" className="">
          <VStack className="mr-10">
          
            {/* <Text className="text-3xl mx-auto border-2">Find Your New Friends</Text> */}
            {/* <GiSittingDog size={{ base: 25, md: 50, lg: 75, xl: 125 }} /> */}
            {/* <Text className="text-2xl text-green-300">petify</Text> */}
            <img src="3867351.jpg" className="h-96 w-96 pt-12 mr-16"/>
          </VStack>
        </Box>
        <Box
          w={["full", "md"]}
          p={[8, 10]}
          mt={[20, "10vh"]}
          border={["none", "1px"]}
          borderColor={["", "gray.300"]}
          borderRadius={10}
          boxShadow="lg"
        >
          <VStack spacing={4} align={"flex-start"} w={"full"}>
            <VStack spacing={1} align={["flex-start", "center"]} w={"full"}>
              <Heading>Login</Heading>
              <Text className="">Enter your e-mail and password to login</Text>
            </VStack>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                rounded="none"
                variant={"outline"}
                value={username}
                onChange={handleusername}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                rounded={"none"}
                variant={"outline"}
                type="password"
                value={password}
                onChange={handlepassword}
              />
            </FormControl>
            <HStack w={"full"} justify={"space-between"}>
              <Text variant={"Link"} colorScheme="blue">
                Forgot Password?
              </Text>
              <Link to="/signup">
                <Text variant={"Link"} colorScheme="blue">
                  Create New account
                </Text>
              </Link>
            </HStack>
            <Button rounded={"none"} onClick={submithandler} className="">
              Login
            </Button>
          </VStack>
        </Box>
      </HStack>
    </div>
  );
};

export default Login;