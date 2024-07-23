import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { usersApi } from '../features/api/usersApi';
import {FormValues} from "../types/Types";
import { useDispatch } from "react-redux";
import { setAdminLogins } from "../features/auth/authSlice";
import AdminNavbar from "./AdminNavbar";


const AdminLogin: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [loginAdmin,{isLoading:adminLoading}] = usersApi.useAdminloginMutation();
const dispatch = useDispatch();
const navigate = useNavigate();


  const onSubmit = async(data: FormValues) => {
   try {
    const admin = await loginAdmin(data);
    console.log(admin);
      dispatch(setAdminLogins({user: admin.data, token: admin.data.token}));
      navigate('/admin');

   } catch (error) {
      console.log(error);
    
   }
  };




  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="card max-w-fit grid grid-cols-1 gap-2">
                <div className="chat chat-end place-items-center">
                    <div className="chat-bubble text-2xl">Admin Login</div>
                </div>
                <div className='grid grid-cols-1 gap-2 place-items-center rounded-box max-w-fit'>
                    <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
                        <input {...register("email", { required: true })} type="email" className="grow" placeholder="Email" />
                    </label>
                    {errors.email && <span className="text-red-600">Email is required</span>}
                    <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
                        <input {...register("password", { required: true })} type="password" className="grow" placeholder="Password" />
                    </label>
                    {errors.password && <span className="text-red-600">Password is required</span>}
                </div>
                <button type='submit' className='btn btn-outline w-full btn-info'>
                    {adminLoading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}</button>
            </form>
            <div className="flex gap-2 items-center justify-center">
                <button className='btn btn-info btn-outline btn-sm'>
                    <NavLink to="/login/user">Login as User?</NavLink>
                </button>
                <button className='btn btn-sm btn-warning btn-outline'>
                    <NavLink to="/">🏠 Home?</NavLink>
                </button>
            </div>
        </div>
      
     
      <Footer />
    </>
  );

};

export default AdminLogin;