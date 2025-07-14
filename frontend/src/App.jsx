import React from 'react'
import { Route } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword.jsx'

export const serverUrl = "http://localhost:8000";

const App = () => {
  return (

    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>

  )
}

export default App;