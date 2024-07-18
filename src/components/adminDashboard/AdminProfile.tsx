import cover from '../../assets/cover-01.png';
import React, { useState } from "react";


  interface UserProfileProps {
    full_name: string;
    email: string;
    contact_phone?: string;
    address?: string;
  }
  
  const AdminProfile = () => {
    const [user, setUser] = useState<UserProfileProps>({
      full_name: "Kim Mouse",
      email: "kim@example.com",
      contact_phone: "123-568-7890",
      address: "123 Main St, USA",
    });
  return (
    <>
      {/* <Navbar /> */}
      <div
        className="h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="w-100 bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Profile</h2>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="full_name" className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={user.full_name}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="contact_phone" className="text-sm font-medium text-gray-600">Contact Phone</label>
              <input
                type="text"
                id="contact_phone"
                name="contact_phone"
                value={user.contact_phone || ""}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="address" className="text-sm font-medium text-gray-600">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={user.address || ""}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default AdminProfile
