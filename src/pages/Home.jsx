import React from 'react'
import {Flex} from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom';
import { Navbar, Categories, Feed, Create, VideoPin, SearchInfo} from '../components'
import {categories} from '../data'


export default function Home({user}) {

  return (
    <div>
      <Navbar user = {user} />

     <Flex width={"100vw"}>
      <Flex
        direction={"column"} 
        justifyContent = "start"
        alignItems = {"center"}
        width = "5%"
        >
          {categories && categories.map((data) => <Categories key = {data.id} data = {data} />)}

        </Flex>
        <Flex
        justifyContent={"center"}
        alignItems = {"center"}
        px = {4}
        width={"95%"}
       
        >
          <Routes>
            <Route path = "/" element = {<Feed/>} />
            <Route path = "/category/:categoryId" element = {<Feed />} />
            <Route path = "/create" element = {<Create />} />
            <Route path = "/video/Info/:videoId" element = {<VideoPin />} />
            <Route path = "/search" element = {<SearchInfo />} />
          </Routes>

        </Flex>
     </Flex>

    </div>
  )
}
