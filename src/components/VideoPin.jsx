import { Flex, colorMode, useColorMode, useColorModeValue, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function VideoPin({data}) {

  const {colorMode} = useColorMode()
    const bgColor = useColorModeValue("blackAlpha.700", "gray.900")
    const textColor = useColorModeValue("gray.100", "gray.100")
  return (
    <Flex
      direction = {"column"}
      _hover = {{shadow: "xl"}}
      alignItems = {"center"}
      overflow = {"hidden"}
      rounded = "md"
      cursor = {"pointer"}
      justifyContent = {"space-between"}
      position = {"relative"}
      maxWidth = {"300px"}
      shadow = {"lg"}
    >
      <Link to={''}>
        <video
        src = {data.videoUrl}
        onMouseOver={(e) => e.target.play()}
        onMouseOut = {(e) =>e.target.pause()}
         />
      </Link>
      <Flex bottom = "0" left = "0" position = {"absolute"}
      p = {2}
      width = {"full"}
      bg = {bgColor}
      direction = {"column"}
      >
        <Flex width={"full"} justifyContent = "space-between" alignItems={"center"}>
          <Text color = {textColor}
           isTruncated 
          fontSize={20}
          onMouseOver = {(e) => e.target.style.display = "none"}
          onMouseOut = {(e) => e.target.style.display = "block"}
          >{data.comment}</Text>

        </Flex>
      </Flex>

    </Flex>
  )
}
