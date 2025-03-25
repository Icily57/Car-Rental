import React, { useState } from "react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
// import Navbar from "../Navbar";
// import Footer from "../Footer";

const UserProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    contact_phone: user?.contact_phone || '',
    address: user?.address || '',
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Implement save functionality here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to user data if needed
    setFormData({
      full_name: user?.full_name || '',
      email: user?.email || '',
      contact_phone: user?.contact_phone || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div>
        <div className="w-full max-w-4xl bg-cyan-100 bg-opacity-80 p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">My Profile</h1>
          <div className="flex items-center mb-6">
            <div className="w-32 h-32 bg-black rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-4xl text-white font-semibold">{user?.full_name?.[0]}</span>
            </div>
            <div className="ml-6">
              <h2 className="text-3xl font-semibold text-gray-800">{user?.full_name}</h2>
              <p className="text-xl text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <label htmlFor="full_name" className="text-sm font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className={`px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300 ${isEditing ? '' : 'bg-gray-100'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300 ${isEditing ? '' : 'bg-gray-100'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="contact_phone" className="text-sm font-semibold text-gray-700">Contact Phone</label>
              <input
                type="text"
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                className={`px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300 ${isEditing ? '' : 'bg-gray-100'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="address" className="text-sm font-semibold text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300 ${isEditing ? '' : 'bg-gray-100'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition ease-in-out duration-300"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition ease-in-out duration-300"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition ease-in-out duration-300"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default UserProfile;
