import React, {useState, useEffect} from 'react'
import { firebaseApp } from '../firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { getAllFields } from '../utils/fetchData';
import Spinner from '../components/Spinner';
import VideoPin from './VideoPin';
import { SimpleGrid } from '@chakra-ui/react';

export default function Feed() {
  const firestoreDb = getFirestore(firebaseApp)
  const [feeds, setFeeds] = useState(null)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    setloading(true)
    getAllFields(firestoreDb).then(data => {
      setFeeds(data)
      setloading(false)
      
    })
    

  }, [])

  if (loading) return <Spinner message={"loading your feeds"} />
 
  return (
    <SimpleGrid
     minChildWidth='300px'
      spacing='15px' 
      width={"full"}
       autoColumns= {"max-content"}
       overflowX = {"hidden"} 
       px = "2"
       >
         {feeds && feeds.map((data) => (
           <VideoPin key = {data.id} maxWidth = {420} height = {"80px"} data = {data} />

          ) )}
    </SimpleGrid>
  )
}
