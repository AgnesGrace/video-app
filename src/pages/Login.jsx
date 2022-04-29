import React from 'react';
import {Button, Flex, HStack, Image} from "@chakra-ui/react";
import {FcGoogle} from 'react-icons/fc';
import { useNavigate } from 'react-router-dom'
import Background from '../img/background.jpg';


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, doc, setDoc} from 'firebase/firestore';
import { firebaseApp } from '../firebaseConfig';



export default function Login() {
  const firebaseAuth = getAuth(firebaseApp);//authentication instance associated with the provider
  const provider = new GoogleAuthProvider();//the provider needed
  const navigate = useNavigate()//to be able to navigate to different location, this is from the reat-router-dom...hook
  //the firebase method need to wait to triggger the popup, getting authentication ... so async is needed
  const login = async () => {
    const {user} = await signInWithPopup(firebaseAuth, provider)//instead of res, i destructured it because i need just the user
    const {refreshToken, providerData} = user;
    const firebaseDb = getFirestore(firebaseApp)
    //need to keep these information in the local storage whenever the user login successfully
    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));

    await setDoc(
      doc(firebaseDb, "users", providerData[0].uid),
       providerData[0]
      );
      navigate('/', {replace: true })


  
  }
  return (
    <Flex
      justifyContent = {"center"}
      alignItems = {"center"}
      width = {"100vw"}
      height = {"100vh"}
      position = {"relative"}
    >
    <Image src = {Background} objectFit = "cover" width = {"full"} height = {"full"}/>
    <Flex 
    position = {"absolute"}
    width = {"100vw"}
    height = {"100vh"}
    bg = {"blackAlpha.700"}
    top = {0}
    left={0}
    justifyContent = {"center"}
    alignItems = {"center"}
    >
      <HStack>
        <Button leftIcon={<FcGoogle fontSize = {24} />}
         colorScheme = {"whiteAlpha"}
         shadow = {"lg"}

         onClick = {() => login()}
         >
          Welcome! Login with your Gmail
        </Button>
      </HStack>
    </Flex>

    </Flex>
  )
}
