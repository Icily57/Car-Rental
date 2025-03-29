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
       toast.success("🎉 Registration successful! Please login.", { style: { background: "#1E3A8A", color: "#fff" } });
       navigate('/login');
    } catch (err:any) {
       toast.error("⚠️ An error occurred. Please try again.", { style: { background: "#1E3A8A", color: "#fff" } });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900 p-6">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="card bg-gray-200 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-2/5 text-gray-800 border border-blue-200"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 font-[Poppins]">
            🚀 Welcome! Create Your Account
          </h1>
          
          <div className="space-y-6">
            {[
              { label: "Full Name", name: "full_name", type: "text", required: true },
              { label: "Email", name: "email", type: "email", required: true },
              { label: "Password", name: "password", type: "password", required: true },
              { label: "Contact Phone", name: "contact_phone", type: "text", required: false },
              { label: "Address", name: "address", type: "text", required: false },
            ].map(({ label, name, type, required }) => (
          <div key={name} className="flex flex-col space-y-2">
                  <label className="text-lg font-medium text-black">{label}</label>
                  <input
                    {...register(name as keyof FormValues, required ? { required: true } : {})}
                    type={type}
                    className="w-full px-4 py-3 border border-blue-300 rounded-lg bg-blue-200 text-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors[name as keyof FormValues] && (
                    <span className="text-red-500 text-sm">⚠️ {label} is required</span>
                  )}
          </div>

            ))}
          </div>

          <div className="w-full flex justify-center mt-6">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-10 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-blue-400/50"
            >
              {isLoading ? <span className="loading loading-spinner text-white"></span> : "Register ✨"}
            </button>
          </div>

          <NavLink to="/" className="block text-center text-blue-700 mt-6 hover:text-blue-500 transition">
            🏡 Back to Home
          </NavLink>

          <p className="text-center text-gray-700 text-sm mt-4">
            Already have an account? 
            <NavLink to="/login" className="text-blue-500 hover:underline ml-1">
              Login here
            </NavLink>.
          </p>
        </form>
      </div>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
};

export default Register;
