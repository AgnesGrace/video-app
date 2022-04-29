import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import {useColorMode, useColorModeValue, Flex, Image, InputGroup, 
        InputLeftElement, Input, Menu, MenuItem, MenuButton, MenuList, Button} from '@chakra-ui/react'
import {IoMoon, IoSearch, IoSunny, IoAdd, IoLogOut} from 'react-icons/io5'
import logo from '../img/logo.png'
import logo_dark from '../img/logo_dark.png'


export default function Navbar({ user }) {

  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("gray.600", "gray.300")
  return (
    <Flex
    justifyContent = {"space-between"}
    width ="100vw"
    p = {4}
    alignItems = {"center"}
    >
      <Link to={"/"}>
        <Image src = {colorMode === "light" ? logo_dark : logo }
         width = {"80px"} 
         borderRadius = {15}/>
      </Link>
      
    <InputGroup mx={6} width = "60vw">
      <InputLeftElement
        pointerEvents='none'
        children={<IoSearch fontSize={25} />}
      />
      <Input type='text' placeholder='Search...' fontSize={18} variant = "filled" fontWeight={"medium"}/>
    </InputGroup>
    <Flex
    alignItems={"center"}
    justifyContent = {"center"}
    >
    <Flex 
    cursor={"pointer"}
    width={"40px"}
     height={"40px"} 
     justifyContent={"center"}
     alignItems = {"center"}
     borderRadius = {"4px"}
     onClick = {toggleColorMode}
     >
       {colorMode ==="light" ? <IoMoon fontSize={25} /> : <IoSunny fontSize={25} />}

    </Flex>

    <Link to = {'/create'}>
      <Flex 
      justifyContent={"center"} 
      alignItems = {"center"} 
      bg = {bgColor} height = {"40px"} 
      width = {"40px"}
      borderRadius = {"5px"}
      _hover = {{shadow: "md"}}
      transition = "ease-in-out"
      transitionDuration={"0.3s"}
      mx = {6}
      >
        <IoAdd fontSize = {25}
        color = {`${colorMode === "dark" ? "#111" : "#f1f1f1"}`} />
      </Flex>
    </Link>
    <Menu>
      <MenuButton>
        <Link
         to = "/" 
         fontWeight = {"bold"}
         >
           {user?.displayName}
        </Link>
      </MenuButton>
      <MenuList>
        <MenuItem shadow={"lg"}>
          <Link to = {""}>My Account</Link>
        </MenuItem>
        <MenuItem alignItems={"center"} flexDirection={"row"} gap = {3} >Logout <IoLogOut fontSize = {20} /></MenuItem>
  
      </MenuList>
    </Menu>

    </Flex>
    </Flex>
  )
}
