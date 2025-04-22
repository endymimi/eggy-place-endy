import React from "react";
import brandLogo from "../assets/nav-logo.svg";
import MyButton from "../components/MyButton";
import Input from "../components/Input";
import { forgotPasswordSchema } from "../utils/ValidationSchema";
import { useForm } from "react-hook-form";
import { Toaster,toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingRing from "../utils/Loader";
const baseUrl = import.meta.env.VITE_API_URL;

const ForgotPwd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPwd = async (data) => {
    try {
      const req = await fetch(`${baseUrl}/api/auth/forgot-password`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const res = await req.json();
      if(!res.success){
        toast.error(res.errMsg)
      }
      if(res.success){
        toast.success(res.message)
      }
    } catch (error) {}
  };

  const btnTxt = isSubmitting ? <LoadingRing/> : "Request Password Reset"
  return (
    <>
      <main className="bg-[#2F2F2F] h-screen flex flex-col text-center  md:text-start justify-center items-center">
        <section className="">
          <div className="flex justify-center mb-6">
            <img src={brandLogo} alt="brand-logo" className="w-[49px]" />
          </div>
          <h1 className="text-[#FBFBFB] text-[32px] font-[500] ">
            Forgot Password?
          </h1>
          <p className="font-[400] text-[20px] text-[#FBFBFB]">
            No worries, we’ll send you instruction to help
          </p>
        </section>
        <form className="mt-4" onSubmit={handleSubmit(handleForgotPwd)}>
          <Input
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <p className="text-red-600">{errors.email?.message}</p>
          <div className="mt-4">
            <MyButton
              text={btnTxt}
              className="w-[350px] font-[500] text-[20px] md:w-[400px] h-[56px]"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </main>      
    </>
  );
};

export default ForgotPwd;