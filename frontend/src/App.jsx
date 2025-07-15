import React from 'react'
import { Route } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword.jsx'
import getCurrentUser from './hooks/getCurrentUser.jsx'
import { useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import { Navigate } from 'react-router-dom'
import getSuggestedUsers from './hooks/getSuggestedUsers.jsx'
import Profile from './pages/Profile.jsx'
import EditProfile from './pages/EditProfile.jsx'

export const serverUrl = "http://localhost:8000";

const App = () => {

  getCurrentUser();
  getSuggestedUsers();

  const { userData} = useSelector((state) => state.user);

  return (

    <Routes>
      <Route path="/signup" element={ !userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path="/signin" element={ !userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path="/" element={ userData ? <Home /> : <Navigate to={"/signin"} />} />
      <Route path="/forgot-password" element={ !userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path="/profile/:userName" element={ userData ? <Profile /> : <Navigate to={"/signin"} />} />
      <Route path="/editprofile" element={ userData ? <EditProfile /> : <Navigate to={"/signin"} />} /> 
    </Routes>

  )
}

export default App;