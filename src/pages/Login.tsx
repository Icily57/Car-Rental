import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { usersApi } from "../features/api/usersApi";
import {FormValues} from "../types/Types";
import { useDispatch } from "react-redux";
import { setUserLogins } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";


const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [loginUser,{isLoading}] = usersApi.useLoginMutation();
const dispatch = useDispatch();
const navigate = useNavigate();


  const onSubmit = async(data: FormValues) => {
   try {
    const user = await loginUser(data);
    console.log(user);
      dispatch(setUserLogins({user: user.data, token: user.data.token}));
      navigate('/dashboard');

   } catch (error) {
      console.log(error);
    
   }
  };




  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="card gap-6 p-10 shadow-xl rounded-lg w-full max-w-lg">
                            <h1 className="text-4xl text-white text-center mb-6">Login</h1>
                            <div className="grid grid-cols-1 gap-2 place-items-center rounded-box max-w-fit min-w-full">
                                <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
                                    <input {...register("email", { required: true })} type="email" className="grow" placeholder="Email" />
                                </label>
                                {errors.email && <span className="text-red-600">Email is required</span>}
                                <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
                                    <input {...register("password", { required: true })} type="password" className="grow" placeholder="Password" />
                                </label>
                                {errors.password && <span className="text-red-600">Password is required</span>}
                            </div>
                            <div className="w-full flex justify-center">
                                <button type="submit" className="btn btn-success py-3 pb-10 px-10 rounded-lg text-lg">
                                    {isLoading ? <span className="loading loading-spinner text-error"></span> : 'Login'}
                                </button>
                            </div>
                            <NavLink to="/" className="text-white mt-4 text-center block">
                                🏡 Go to HomePage
                            </NavLink>
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-400">
                                    Don't have an account?{' '}
                                    <NavLink to="/register" className="text-blue-500 hover:underline">
                                        Create here
                                    </NavLink>.
                                </p>
                            </div>
                        </form>
        </div>
     
      <Footer />
    </>
  );

};

export default Login;
