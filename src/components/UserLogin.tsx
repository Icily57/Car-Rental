// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import { useForm } from "react-hook-form";
// import { usersApi } from "../features/api/usersApi";
// import {FormValues} from "../types/Types";
// import { useDispatch } from "react-redux";
// import { setUserLogins } from "../features/auth/authSlice";
// import Navbar from "./Navbar";
// import toast, { Toaster } from "react-hot-toast";


// const UserLogin: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
//   const [loginUser,{isLoading}] = usersApi.useUserloginMutation();
// const dispatch = useDispatch();
// const navigate = useNavigate();


//   const onSubmit = async(data: FormValues) => {
//    try {
//     const user = await loginUser(data);
//     console.log(user);
//       dispatch(setUserLogins({user: user.data, token: user.data.token}));
//       toast.success("Login successful");
//       navigate('/dashboard');

//    } catch (error) {
//     toast.error("An error occurred. Please try again.");
//       console.log(error);
    
//    }
//   };




//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
//       <form onSubmit={handleSubmit(onSubmit)} className="card gap-6 p-10 shadow-xl rounded-lg w-full max-w-lg bg-white">
//                             <h1 className="text-4xl text-gray-900 text-center mb-6">Login</h1>
//                             <div className="grid grid-cols-1 gap-4 place-items-center rounded-box max-w-fit min-w-full">
//                             <div className="w-full max-w-xs">
//               <input {...register("email", { required: true })} type="email" className="input input-bordered w-full" placeholder="Email" />
//               {errors.email && <span className="text-red-600">Email is required</span>}
//             </div>
//             <div className="w-full max-w-xs">
//               <input {...register("password", { required: true })} type="password" className="input input-bordered w-full" placeholder="Password" />
//               {errors.password && <span className="text-red-600">Password is required</span>}
//             </div>
//             </div>
//             <div className="w-full flex justify-center">
//             <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-10 rounded-lg text-lg">
//               {isLoading ? <span className="loading loading-spinner text-error"></span> : 'Login'}
//             </button>
//           </div>
//                             <NavLink to="/" className="text-black mt-4 text-center block">
//                                 🏡 Go to HomePage
//                             </NavLink>                          
//                         <div className="flex gap-2 items-center justify-center mt-4">
//           <button className='btn btn-info btn-outline btn-sm'>
//             <NavLink to="/register" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
//               Need an account?
//             </NavLink>
//           </button>
//           {/* <button className='btn btn-sm btn-warning btn-outline'>
//             <NavLink to="/login/admin" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
//               🅰️Admin?
//             </NavLink>
//           </button> */}
//         </div>
//       </form>
//         </div>  
//       <Footer />
//       <Toaster position="top-right" />
//     </>
//   );

// };

// export default UserLogin;