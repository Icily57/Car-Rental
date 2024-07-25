import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FormValues } from "../types/Types";
import { useForm, SubmitHandler } from "react-hook-form";
import { usersApi } from "../features/api/usersApi";
import toast, { Toaster } from "react-hot-toast";

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [registerUser, { isLoading }] = usersApi.useRegisterMutation();
  
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {      
       await registerUser(data).unwrap();
       toast.success('Registration successful, please login');
       navigate('/login');
    } catch (err:any) {
       toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
        <form onSubmit={handleSubmit(onSubmit)} className="card gap-6 p-10 shadow-xl rounded-lg w-full max-w-lg bg-white">
          <h1 className="text-4xl text-gray-900 text-center mb-6">Register</h1>
          <div className="grid grid-cols-1 gap-4 place-items-center rounded-box max-w-fit min-w-full">
            <div className="w-full max-w-xs">
              <input {...register("full_name", { required: true })} type="text" className="input input-bordered w-full" placeholder="Full Name" />
              {errors.full_name && <span className="text-red-600">Full Name is required</span>}
            </div>
            <div className="w-full max-w-xs">
              <input {...register("email", { required: true })} type="email" className="input input-bordered w-full" placeholder="Email" />
              {errors.email && <span className="text-red-600">Email is required</span>}
            </div>
            <div className="w-full max-w-xs">
              <input {...register("password", { required: true })} type="password" className="input input-bordered w-full" placeholder="Password" />
              {errors.password && <span className="text-red-600">Password is required</span>}
            </div>
            <div className="w-full max-w-xs">
              <input {...register("contact_phone")} type="text" className="input input-bordered w-full" placeholder="Contact Phone" />
            </div>
            <div className="w-full max-w-xs">
              <input {...register("address")} type="text" className="input input-bordered w-full" placeholder="Address" />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-10 rounded-lg text-lg">
              {isLoading ? <span className="loading loading-spinner text-error"></span> : 'Register'}
            </button>
          </div>
          <NavLink to="/" className="text-gray-900 mt-4 text-center block">
            🏡 Go to HomePage
          </NavLink>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <NavLink to="/login" className="text-blue-500 hover:underline">
                Login here
              </NavLink>.
            </p>
          </div>
        </form>
      </div>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
};

export default Register;
