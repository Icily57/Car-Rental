import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { usersApi } from "../../features/api/usersApi";

const AdminProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    contact_phone: user?.contact_phone || '',
    address: user?.address || '',
  });
  const [updateProfile, { isLoading: isUpdating }] = usersApi.useUpdateUserMutation(); // Assuming a mutation for updating profile

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        contact_phone: user.contact_phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-950 p-6">
      <div className="w-full max-w-3xl bg-blue-200 p-8 rounded-2xl shadow-lg transform hover:scale-[1.02] transition duration-300">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-6 font-[Poppins]">Admin Profile 😎</h1>
          <div className="flex items-center mb-6">
            <div className="w-32 h-32 bg-black rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-4xl text-white font-semibold">{user?.full_name?.[0]}</span>
            </div>
            <div className="ml-6">
              <h2 className="text-3xl font-semibold text-black">{user?.full_name}</h2>
              <p className="text-xl text-black">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <label htmlFor="full_name" className="text-sm font-semibold text-black">Full Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className={`px-4 py-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300 text-blue-950 ${isEditing ? 'bg-white' : 'bg-blue-50'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="email" className="text-sm font-semibold text-gray-800">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`px-4 py-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300 text-blue-950 ${isEditing ? 'bg-white' : 'bg-blue-50'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="contact_phone" className="text-sm font-semibold text-gray-800">Contact Phone</label>
              <input
                type="text"
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                className={`px-4 py-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300 text-blue-950 ${isEditing ? 'bg-white' : 'bg-blue-50'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="address" className="text-sm font-semibold text-gray-800">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`px-4 py-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300 text-blue-950 ${isEditing ? 'bg-white ' : 'bg-blue-50'}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition ease-in-out duration-300"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg transition ease-in-out duration-300"
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
    </>
  );
};

export default AdminProfile;
