import React from 'react'
import {Link} from 'react-router-dom'
import {Flex, Tooltip, Box} from "@chakra-ui/react"

export default function Categories({ data }) {
  return (
    <Flex my={5} cursor={"pointer"}>
      <Link to = {`/category/:${data.name}`}>
        <Tooltip hasArrow label={data.name} bg='red.600' closeDelay={300} placement = {"right"}>
          <Box>{data.iconSrc}</Box>
        </Tooltip>
      </Link>
    </Flex>
  )
}
