import React, { useState } from "react";
import Input from "../components/Input";
import MyButton from "../components/MyButton";
import {Link} from "react-router-dom";
import visibilityOn from "../assets/visibility_on.svg";
import visibilityOff from  "../assets/visibility_off.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../utils/ValidationSchema";
import LoadingRing from "../utils/Loader";
import { Toaster,toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


const baseUrl = import.meta.env.VITE_API_URL;

const SignIn = ({ switchToSignUp }) => {
  const [isReveal, setIsReveal] = useState(false);
  const [isError,setIsError] = useState(null)
  const {login} = useAuth()
  function togglePwd(){
    setIsReveal((prev)=> !prev)
  }

  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(signInSchema),
  })
  const onSubmit = async(data) => {
    try {
      const req = await fetch(`${baseUrl}/api/auth/sign-in`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const res = await req.json();
      if(!res.success){
        // toast.error(res.errMsg);
      
        setIsError(res.errMsg)
        setTimeout(() => setIsError(null), 3000);
      }
      if(res.success){
        toast.success(res.message)
        localStorage.setItem("customerToken",res.user.token)
        login(res.user.token, res.user);
      }
    } catch (error) {
      if(error.message == "Failed to fetch"){

        toast.error("connection failed")
        return
      }
      toast.error(error.message)
      
    }
  }
  const btnText  = isSubmitting   ? <LoadingRing/> : "Sign In";

  return (
    <>
     
      <main>
        <div className="text-[#FBFBFB]">
          <h6 className="text-[#FBFBFB] font-[500] text-[26px] pt-8">
            Welcome Back
          </h6>
          <p className="text-[14px] font-[400] pb-6 ">Sign In To Your Account </p>
        </div>
        
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>

          <Input type="email" placeholder="Email" name="email" {...register("email")} />
          <p className="text-red-600">{errors.email?.message}</p>

          </div>
          <div className="relative w-full">

          <Input type={isReveal ? "text" : "password"} placeholder="Password" name="password" {...register("password")}/>
          <img className=" absolute top-2.5  left-[90%]" src={isReveal ? visibilityOff : visibilityOn} alt="toggle-password-img" onClick={togglePwd} />
          <p className="text-red-600">{errors.password?.message}</p>
          </div>
          {isError && (
  <div className="text-red-500 bg-red-100 px-4 py-2 rounded mt-2 text-sm">
    {isError}
  </div>
)}
          <Link to="/forgot-password" className="text-[#FBFBFB] text-[10px] font[400] underline">Forgot Password?</Link>
          <MyButton text={btnText} className="w-full h-[40px] font-[500] text-[20px] " disabled={isSubmitting} />
        </form>
        <p className="py-4">
          <span className="text-[15px] font-[400] text-[#FBFBFB] ">Don't have an account?</span> <span
            className="text-[#B67B0F] font-[700] text-[16px] cursor-pointer ps-0.5"
            onClick={switchToSignUp}
          >
          Sign up
          </span>
        </p>
      </main>

    </>
  );
};

export default SignIn;