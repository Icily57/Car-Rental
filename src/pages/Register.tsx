import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FormValues } from "../types/Types";
import { useForm, SubmitHandler } from "react-hook-form";
import { usersApi } from "../features/api/usersApi";
import { useDispatch } from "react-redux";
import { setUserRegister } from "../features/auth/authSlice";

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [registerUser, { isLoading }] = usersApi.useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log('Submitting data:', data); // Log data being submitted
      const user = await registerUser(data).unwrap();
      console.log('User registered successfully:', user);
      // dispatch(setUserRegister({ user: user.data, token: user.data.token }));
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      // if ((error as any).data) {
      //   console.error('Error details:', (error as any).data); // Log server response error details
      // }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="card gap-6 p-10 shadow-xl rounded-lg w-full max-w-lg">
          <h1 className="text-4xl text-white text-center mb-6">Register</h1>
          <div className="grid grid-cols-1 gap-2 place-items-center rounded-box max-w-fit min-w-full">
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
              <input {...register("full_name", { required: true })} type="text" className="grow" placeholder="Full Name" />
            </label>
            {errors.full_name && <span className="text-red-600">Full Name is required</span>}
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
              <input {...register("email", { required: true })} type="email" className="grow" placeholder="Email" />
            </label>
            {errors.email && <span className="text-red-600">Email is required</span>}
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
              <input {...register("password", { required: true })} type="password" className="grow" placeholder="Password" />
            </label>
            {errors.password && <span className="text-red-600">Password is required</span>}
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
              <input {...register("contact_phone")} type="text" className="grow" placeholder="Contact Phone" />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
              <input {...register("address")} type="text" className="grow" placeholder="Address" />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs">
              <input {...register("role")} type="text" className="grow" placeholder="Role" />
            </label>
          </div>
          <div className="w-full flex justify-center">
            <button type="submit" className="btn btn-success py-3 pb-10 px-10 rounded-lg text-lg">
              {isLoading ? <span className="loading loading-spinner text-error"></span> : 'Register'}
            </button>
          </div>
          <NavLink to="/" className="text-white mt-4 text-center block">
            🏡 Go to HomePage
          </NavLink>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <NavLink to="/login" className="text-blue-500 hover:underline">
                Login here
              </NavLink>.
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
