import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { userDataContext } from './context/UserContext'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Home from './pages/Home'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'

function App() {
  const { userData, loading } = useContext(userDataContext)
  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }
  
  return (
    <Routes>
      <Route 
        path='/' 
        element={
          userData && userData.assistantImage && userData.assistantName 
            ? <Home/> 
            : <Navigate to={userData ? "/customize" : "/signin"} replace/>
        }
      />
      <Route 
        path='/signin' 
        element={!userData ? <SignIn/> : <Navigate to="/" replace/>}
      />
      <Route 
        path='/signup' 
        element={!userData ? <SignUp/> : <Navigate to="/" replace/>}
      />
      <Route 
        path='/customize' 
        element={userData ? <Customize/> : <Navigate to="/signin" replace/>}
      />
      <Route 
        path='/customize2' 
        element={userData ? <Customize2/> : <Navigate to="/signin" replace/>}
      />
    </Routes>
  )
}

export default App