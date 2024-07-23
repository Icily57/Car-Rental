import React, { useState } from "react";
import cover from '../../assets/cover-01.png';
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
// import Navbar from "../Navbar";
// import Footer from "../Footer";

const UserProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.user.full_name || '',
    email: user?.user.email || '',
    contact_phone: user?.user.contact_phone || '',
    address: user?.user.address || '',
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
      full_name: user?.user.full_name || '',
      email: user?.user.email || '',
      contact_phone: user?.user.contact_phone || '',
      address: user?.user.address || '',
    });
    setIsEditing(false);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div
        className="h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="w-full max-w-4xl bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>
          <div className="flex items-center mb-6">
            {/* Profile picture placeholder */}
            <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">{user?.user.full_name?.[0]}</span>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{user?.user.full_name}</h2>
              <p className="text-gray-600">{user?.user.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="full_name" className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isEditing ? '' : 'bg-gray-100'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isEditing ? '' : 'bg-gray-100'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="contact_phone" className="text-sm font-medium text-gray-600">Contact Phone</label>
              <input
                type="text"
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isEditing ? '' : 'bg-gray-100'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="address" className="text-sm font-medium text-gray-600">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isEditing ? '' : 'bg-gray-100'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex justify-end mt-4 space-x-4">
              {isEditing ? (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
