import React, {  useRef, useContext } from "react";

import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg"
import authBg from "../assets/authBg.png"
import image4 from "../assets/image4.jpeg"
import image5 from "../assets/image5.jpeg"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from "../context/UserContext.jsx"
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";


function Customize() {
 const { 
        serverUrl, 
        userData, 
        setUserData, 
        backendImage, 
        setBackendImage,
        frontendImage, 
        setFrontendImage, 
        selectedImage, 
        setSelectedImage 
    } = useContext(userDataContext);
    const navigate = useNavigate()

    const inputImage=useRef()

    const handleImage=(e)=>{
        const file=e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
        
    }


    return (
        <div className="w-full h-[100vh] bg-gradient-to-t from-black
                       to-[#030353] flex justify-center items-center flex-col p-[20px] gap-[20px]">

                        
                  <IoArrowBack className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]'
                  onClick={()=>navigate("/")}/>
                  <h1 className='text-white mb-[20px] text-[30px]'>Select your <span className="text-blue-200">Assistant Image</span></h1>      

            <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
                <Card image={image1}/>
                 <Card image={image2}/>
                  <Card image={authBg}/>
                   <Card image={image4}/>
                    <Card image={image5}/>
                     <Card image={image6}/>
                      <Card image={image7}/>
             <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff27]
                        rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950
                         cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedImage=="input"?"border-4 border-white shadow-2xl shadow-blue-950":null} `}
                          onClick={() => {inputImage.current.click()
                            setSelectedImage("input")
                          }}>
                            {!frontendImage &&  <RiImageAddLine  className='text-white w-[25px] h-[25px]'/>}
                            {frontendImage && <img src={frontendImage}
                            className="w-full h-full object-cover"/>}
                    
            
            </div> 
            <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
            </div>
            {selectedImage &&  <button className="min-w-[140px] h-[70px] mt-[20px] text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]"
                               onClick={()=> navigate("/customize2")}>Next</button>}
               
           </div>
    );
}
 
export default Customize;
