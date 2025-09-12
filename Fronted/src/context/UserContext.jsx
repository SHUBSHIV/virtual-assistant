import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:5000";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
      
      // Only set userData if we actually get user data back
      if (result.data && result.data._id) {
        setUserData(result.data);
        console.log('User found:', result.data);
      } else {
        setUserData(null);
        console.log('No user data received');
      }
    } catch (error) {
      console.log('Error fetching current user:', error.response?.status);
      // If error is 401 (unauthorized) or 404, user is not logged in
      if (error.response?.status === 401 || error.response?.status === 404) {
        setUserData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // geminibackentofrontend
  const getGeminiResponse=async (command)=>{
try {
  const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
  return result.data
} catch (error) {
  console.log(error)
}
    }






  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    loading, // Add loading to context
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;