import React from 'react'
import { useContext } from 'react'
import { userDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
function Home() {
  const{userData,serverUrl,setUserData,getGeminiResponse}=useContext(userDataContext)
  const navigate=useNavigate()


//LogOutHOme pages
  const handleLogOut=async ()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/signup")
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }
  

  //Fronted
    return (
      <div className="w-full h-[100vh] bg-gradient-to-t from-black
                 to-[#030353] flex justify-center items-center flex-col gap-[15px]">

         <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold
         absolute top-[20px] right-[20px] bg-white rounded-full cursor-pointer text-[19px]" onClick={handleLogOut}>Log Out</button>

         <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold 
         bg-white absolute top-[100px] right-[20px] rounded-full text-[19px] cursor-pointer  px-[20px] py-[10px]" onClick={() => navigate("/customize")}>
         Customize your Assistant</button>

         <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
         <img src={userData?.assistantImage} alt="" className='h-full object-cover'/>
     </div>

     <h1 className='text-white text-[18px]'>
     I'm {userData?.assistantName}
     </h1>


     </div>

    )
} 
export default Home