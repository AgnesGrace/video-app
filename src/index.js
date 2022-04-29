import React from "react"
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'


import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router } from "react-router-dom";


import {Theme} from './Theme';


const container = document.getElementById("root");
const root = createRoot(container);

root.render(

     //to use all the chakra features
    <ChakraProvider>
        <ColorModeScript initialColorMode= {Theme.config.initialColorMode}/>
        <Router>
            <App />
        </Router>
        
    </ChakraProvider>
)