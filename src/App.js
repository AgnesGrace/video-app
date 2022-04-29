import React, {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';


import Login from './pages/Login';
import Home from './pages/Home';
import { userAccessToken, fetchUserInfo } from './utils/fetchUser';



export default function App() {
  //i need to monitor whether a user loged in or not
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = userAccessToken();
    if (!accessToken) {
      navigate('/login', {replace: true});
    }else {
      const [userInfo] = fetchUserInfo();
      setUser(userInfo);
    }


  }, [])
  return (
      <Routes>
        <Route path = "login" element = {<Login />} />
        <Route path = "/*" element = {<Home user = {user}/>} />
      </Routes>

    )
}
