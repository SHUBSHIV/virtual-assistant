import React, { useState, useContext } from "react";
import bg from "../assets/authbg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl,userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    console.log("Submitting signup:", { name, email, password });

    if (!name || !email || !password) {
      setErr("All fields are required");
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      

      setUserData(result.data)
      // Signup success → navigate to signin page
      navigate("/signin");
      setLoading(false);
      navigate("/customize")
    } catch (error) {
      console.error("Signup error:", error.response?.data);
      setUserData(null)
      setLoading(false);
      setErr(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold">
          Register to
          <span className="text-blue-400"> Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[18px] right-[20px] cursor-pointer"
          >
            {showPassword ? (
              <IoEyeOff className="w-[25px] h-[25px] text-white" />
            ) : (
              <IoEye className="w-[25px] h-[25px] text-white" />
            )}
          </div>
        </div>

        {err && (
          <p className="text-red-500 text-[17px] text-center w-full">*{err}</p>
        )}

        <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]" disabled={loading}>{loading?"Loading...":"Sign Up"}
        </button>

        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-blue-400 cursor-pointer">Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
