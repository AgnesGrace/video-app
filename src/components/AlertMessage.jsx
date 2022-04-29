import React from 'react'
import {Alert, AlertTitle} from "@chakra-ui/react"

export default function AlertMessage({status, message, icon}) {
  return (
        <Alert status= {`${status ? status:"info"}`}>
            {icon}
            <AlertTitle ml= {10}>{message}</AlertTitle>
        </Alert>
  )
}
