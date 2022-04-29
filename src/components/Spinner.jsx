import React, { useEffect } from 'react'
import { RevolvingDot } from "react-loader-spinner"
import {Flex, Progress, Text} from "@chakra-ui/react"


export default function Spinner({message, progress}) {
    useEffect(() => {

    }, [progress])
  return (
      <Flex 
      height={"full"}
      direction = {"column"}
      justifyContent = {"center"}
      alignItems = {"center"}
      px = {10}
      >
          <RevolvingDot color='blue'/>
          <Text textAlign={"center"} fontSize={25} px = {2}>
              {message}

          </Text>
            {progress && (
          
              <Progress 
              value={Number.parseInt(progress)}
              hasStripe
              isAnimated
              marginTop = {50}
              size = {"sm"}
              colorScheme = {"linkedin"}
              width = {"lg"}
                
              />
            )}
          

      </Flex>
    
  )
}
