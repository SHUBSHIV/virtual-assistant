import React, { useContext } from 'react' // ✅ ADD: useContext import
import { Routes, Route, Navigate } from 'react-router-dom' // ✅ ADD: Navigate import
import { userDataContext } from './context/UserContext'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Home from './pages/Home'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'

function App() {
  const { userData, setUserData } = useContext(userDataContext) // ✅ ADD: loading from context
  
  return (
    <Routes>
      <Route path='/' element={(userData?.assistantImage && userData?.assistantName) ? <Home/> :<Navigate to={"/customize"}/>}/>
      <Route path='/signin' element={!userData?<SignIn/> :<Navigate to={"/"}/>}/>
      <Route path='/signup' element={!userData?<SignUp/> :<Navigate to={"/"}/>}/>
      <Route path='/customize' element={userData?<Customize/> : <Navigate to={"/signin"}/>}/>
      <Route path='/customize2' element={userData?<Customize2/> : <Navigate to={"/signin"}/>}/>
    </Routes>
  )
}

export default App