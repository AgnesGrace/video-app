import React, {useEffect, useState, useRef} from 'react'
import { useColorMode, useColorModeValue, Flex, InputGroup, InputLeftElement,
  Input, Menu, MenuButton, MenuItem, MenuList, Button, Text, FormLabel} from '@chakra-ui/react'
import { IoCheckmark, IoChevronDown, IoCloudUpload, IoLocation, IoTrash, IoWarning } from 'react-icons/io5'
import { categories } from '../data'
import Spinner from './Spinner'
import {getStorage, getDownloadURL, uploadBytesResumable, ref, deleteObject} from 'firebase/storage'
import {firebaseApp} from '../firebaseConfig'
import AlertMessage from './AlertMessage'
import {Editor} from '@tinymce/tinymce-react'
import { fetchUserInfo } from '../utils/fetchUser';
import { setDoc, getFirestore, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


export default function Create() {
  const { colorMode } = useColorMode()
  const textColor = useColorModeValue("gray.800", "gray.50")

  const editorRef = useRef(null)
/*states*/
  const [comment, setComment] = useState("")
  const [category, setcategory] = useState("select a category")
  const [location, setlocation] = useState("")
  const [videoMedia, setvideoMedia] = useState("")
  const [loadingVideo, setloadingVideo] = useState(false)
  const [progress, setprogress] = useState(1)
  const [alert, setalert] = useState(false)
  const [alertStatus, setalertStatus] = useState("")
  const [alertMessage, setalertMessage] = useState("")
  const [alertIcon, setalertIcon] = useState(null)
  const [description, setDescription] = useState("")
  

  const storage = getStorage(firebaseApp)
  const firestoreDb = getFirestore(firebaseApp)

  const navigate = useNavigate()
  const [userInfo] = fetchUserInfo()

   /*video upload*/
  const uploadVideo = (e) => {
    setloadingVideo(true)
    const videoFile = e.target.files[0]
    const storageRef = ref(storage, `videos/${Date.now()}-${videoFile.name}`)

    const uploadTask = uploadBytesResumable(storageRef, videoFile)

    uploadTask.on("state_changed", (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

      setprogress(uploadProgress)
    }, 
    (error) => {
      console.log(error)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setvideoMedia(downloadURL)

        setloadingVideo(false)

        setalert(true)
        setalertStatus("success")
        setalertIcon(<IoCheckmark fontSize={20} />)

        setalertMessage("video uploaded successfully")
        /*needed in order to remove the alert after few secs*/
        setTimeout(() => {
          setalert(false)

        }, 4000)


      });
    })
  }
 /* this is to monitor the video file*/
  useEffect(() => {
    console.log(videoMedia)

  }, [videoMedia])

  const deleteVideo = () => {
    const deleteRef = ref(storage, videoMedia)
    deleteObject(deleteRef).then(() => {
      setvideoMedia(null)
      setalert(true)
        setalertStatus("error")
        setalertIcon(<IoWarning fontSize={20} />)
        setalertMessage("deleted")
        setTimeout(() => {
          setalert(false)

        }, 4000)
    }).catch((error) => {
      console.log(error)
    })
  }

const getDescriptionValue = () => {
  if (editorRef.current) {
    setDescription(editorRef.current.getContent())
  }
}
 /* to check if all the fields are filled*/
const uploadDetails = async () => {
  try {
    setloadingVideo(true)
    if (!comment && !category && !videoMedia) {
      setalert(true)
      setalertStatus("error")
      setalertIcon(<IoWarning fontSize={20} />)

      setalertMessage("The required fields are missing!")
      setTimeout(() => {
          setalert(false)

        }, 4000)
      setloadingVideo(false)     

    }else{
      const data = {
        id: `${Date.now()}`,
        comment: comment,
        userId: userInfo?.uid,
        category: category,
        location: location,
        videoUrl: videoMedia,
        description: description,
      }
      await setDoc(doc(firestoreDb, "videos", `${Date.now()}`), data)
      setloadingVideo(false)
      navigate('/', {replace:true})
    }
  }
   catch(error) {
    console.log(error)

  }

}

useEffect(() => {}, [comment, location, description, category])



  return (
    <Flex 
    alignItems={"center"}
     width={"full"}
      minHeight = {"100vh"} 
      justifyContent = {"center"} 
      padding = {10}
      >
        <Flex
        height={"full"}
        width = {"80%"} 
        border = {"1px"}
        borderColor = {"gray.400"}
        borderRadius = {"md"}
        padding = {"4"}
        flexDirection = {'column'}
        alignItems = {"center"}
        justifyContent = {"Center"}
        gap = {2}
        >
          {alert && (
            <AlertMessage status = {alertStatus} 
            message = {alertMessage} 
            icon = {alertIcon} 
            />
          )}
          
          <Input 
          type={"text"}
          fontSize = {20}
           placeholder='Comment'
           _placeholder={{color: "gray.500"}}
           focusBorderColor='gray.300'
           variant={"flushed"}
           isRequired
           errorBorderColor='red'
            value={comment}
            onChange = {(words) => setComment(words.target.value)}
           />
           {/*categories*/}
           <Flex
           width={"full"}
           alignItems = {"center"}
           gap = {7}
           justifyContent = {"space-between"} 
           marginY = {4}
           >
            <Menu>
              <MenuButton 
              as={Button} 
              rightIcon = {<IoChevronDown fontSize={20}/>}
              px={4}
              py={2}
              transition='all 0.2s'
              borderRadius='md'
              borderWidth='1px'
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}
          
              >
                {category}
              </MenuButton>
              <MenuList zIndex={101} width = {"md"}>
                {categories && categories.map(data => (
                  <MenuItem
                   key = {data.id}
                    _hover = {{bg: "blackAlpha.400"}}
                    px = {4}
                    onClick = {() => setcategory(data.name)}
                    >
                      {data.iconSrc}<Text ml = {4} fontSize={16}>{data.name}</Text>

                    </MenuItem>
                ))}
                
              </MenuList>
            </Menu>

            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<IoLocation color= {`${colorMode === "dark" ? "#f1f1f1" : "#111"}`} />}
              />
              <Input type={"text"}
                fontSize = {20}
                placeholder='Location'
                _placeholder={{color: "gray.500"}}
                focusBorderColor='gray.300'
                variant={"flushed"}
                isRequired
                errorBorderColor='red'
                  value={location}
                  onChange = {(e) => setlocation(e.target.value)} />
            </InputGroup>
           </Flex>
           {/*video upload*/}
           <Flex
           height={"400px"}
           border ={ "1px"}
           borderColor = {"gray.400"}
           borderStyle = {"dashed"}
           borderRadius = {"md"}
           width = {"full"}
           position = {"relative"}
           overflow = {"hidden"}
           >
             {!videoMedia ?
              (<FormLabel width={"full"}>
                <Flex 
                alignItems={"center"} 
                direction={"column"}
                justifyContent = {"center"}
                height = {"full"}
                width = {"full"}
                >
                  <Flex
                  cursor={"pointer"}
                  alignItems={"center"} 
                  direction={"column"}
                  justifyContent = {"center"}
                  height = {"full"}
                  width = {"full"}
                  >
                    {loadingVideo ? (<Spinner message= "uploading your video" progress={progress}/>) : (
                      <>
                        <IoCloudUpload color= {`${colorMode === "dark" ? "#f1f1f1" : "#111"}`} fontSize = {40} />
                        <Text fontSize={20} color = {textColor}>Click to upload your video</Text>

                      </>)}

                  </Flex>

                </Flex>

                {!loadingVideo && (
                  <input 
                  type={"file"}
                  name = {"upload video"}
                  accept = "video/mp4. video/x-m4v, video/*"
                  onChange = {uploadVideo}
                  style = {{width: 0, height: 0}}

                  />
                )}



              </FormLabel>) : 
              (
                <Flex
                position={"relative"}
                  alignItems={"center"} 
                  direction={"column"}
                  justifyContent = {"center"}
                  height = {"full"}
                  width = {"full"}
                  bg = {"black"}
                  >
                    <Flex
                    alignItems={"center"} 
                    direction={"column"}
                    justifyContent = {"center"}
                    height = {"40px"}
                    rounded = {"full"}
                    width = {"40px"}
                    top = {6}
                    right={6}
                    zIndex = {10}
                    position = {"absolute"}
                    bg = {"red"}
                    cursor ={"pointer"}
                    onClick = {deleteVideo}

                    >
                      <IoTrash fontSize={24} color = {"fff"} />

                    </Flex>
                    <video
                      src={videoMedia}
                      style = {{width: "100%", height: "100%"}}
                      controls
                    />


                </Flex>
              )}
           </Flex>

           <Editor
           onChange={getDescriptionValue}
            onInit={(evt, editor) => editorRef.current = editor}
            apiKey = {process.env.REACT_APP_TINYMCE_API_KEY}
            init={{
              height: 500,
              width: "100%",
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              content_css: "dark",
              skin: "oxide-dark"
            }}
      />
        <Button
        variant={`${loadingVideo  ? "outline" : "solid"}`}
        width = {"xl"}
        _hover = {{shadow: "lg"}}
        isLoading = {loadingVideo}
        loadingText = "Uploading"
        colorScheme={"linkedin"}
        onClick = {() => uploadDetails()}
        >Upload Video</Button>
        </Flex>


    </Flex>
  )
}
