// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import { useForm } from "react-hook-form";
// import { usersApi } from '../features/api/usersApi';
// import {FormValues} from "../types/Types";
// import { useDispatch } from "react-redux";
// import { setAdminLogins } from "../features/auth/authSlice";
// import Navbar from "./Navbar";
// import toast, { Toaster } from "react-hot-toast";


// const AdminLogin: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
//   const [loginAdmin,{isLoading:adminLoading}] = usersApi.useAdminloginMutation();
// const dispatch = useDispatch();
// const navigate = useNavigate();


//   const onSubmit = async(data: FormValues) => {
//    try {
//     const admin = await loginAdmin(data);
//     console.log(admin);
//       dispatch(setAdminLogins({user: admin.data, token: admin.data.token}));
//       toast.success("Login successful");
//       if(admin.data.role === "admin"){
//         navigate("/admin")}
//         else{
//           navigate("/dashboard")
//         }

//    } catch (error) {
//     toast.error("An error occurred. Please try again.");
//       console.log(error);
    
//    }
//   };




//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
//       <form onSubmit={handleSubmit(onSubmit)} className="card p-8 shadow-xl rounded-lg w-full max-w-md bg-white">
//                     <div className="text-3xl text-gray-900 text-center mb-6">Admin Login</div>
//                 <div className="grid grid-cols-1 gap-4">
//                 <div className="w-full">
//               <input
//                 {...register("email", { required: true })}
//                 type="email"
//                 className="input input-bordered w-full rounded-lg"
//                 placeholder="Email"
//               />
//               {errors.email && <span className="text-red-600">Email is required</span>}
//             </div>
//             <div className="w-full">
//               <input
//                 {...register("password", { required: true })}
//                 type="password"
//                 className="input input-bordered w-full rounded-lg"
//                 placeholder="Password"
//               />
//               {errors.password && <span className="text-red-600">Password is required</span>}
//             </div>
//                 </div>
//                 <button type='submit'  className="btn btn-info w-full rounded-lg text-white bg-blue-500 hover:bg-blue-600">
//                     {adminLoading ? <span  className="loading loading-spinner loading-sm"></span> : "Login"}</button>
            
//                     <div className="flex gap-4 mt-4 justify-center">
//             <button className='btn btn-sm btn-outline btn-info'>
//               <NavLink to="/login/user" className="text-blue-500 hover:underline">
//                 Login as User?
//               </NavLink>
//             </button>
//             <button className='btn btn-sm btn-outline btn-warning'>
//               <NavLink to="/" className="text-yellow-500 hover:underline">
//                 🏠 Home?
//               </NavLink>
//             </button>
//           </div>
//             </form>            
//         </div>
//       <Footer />
//       <Toaster position="top-right" />
//     </>
//   );

// };

// export default AdminLogin;