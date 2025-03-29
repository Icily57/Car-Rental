import { useEffect, useState } from 'react';
import { usersApi } from '../../features/api/usersApi';
import { FormValues } from '../../types/Types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { RootState } from '../../app/store';
// import { useSelector } from 'react-redux';

const AllUsers = () => {
  // const user = useSelector((state: RootState) => state.auth.user);
  const { data: userData, error, isLoading } = usersApi.useGetUsersQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [users, setUsers] = useState<FormValues[]>([]);

  useEffect(() => {
    if (userData) {
      setUsers(userData);
    }
  }, [userData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-700 text-4xl" />
      </div>
    );
  }
    
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error fetching user data</p>
      </div>
    );
  }

  return (
    <div className="p-4  min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">All Users</h1>
    <div className="overflow-x-auto flex flex-col items-center rounded-lg p-4 ">
      <table className="table w-4/5 bg-blue-100 rounded-lg shadow-md ">
        <thead className="bg-blue-400">
          <tr>
            <th className="text-black py-2 text-lg">Full Name</th>
            <th className="text-black py-2 text-lg">Email</th>
            <th className="text-black py-2 text-lg">Contact</th>
            <th className="text-black py-2 text-lg">Address</th>
            <th className="text-black py-2 text-lg">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-blue-100">
              <td className="py-2">
                <div className="font-bold text-blue-900">{user.full_name}</div>
              </td>
              <td className="py-2">
                <div className="font-bold text-blue-900">{user.email}</div>
              </td>
              <td className="py-2 font-bold text-blue-900">{user.contact_phone}</td>
              <td className="py-2 font-bold text-blue-900">{user.address}</td>
              <td className="py-2 font-bold text-blue-900">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AllUsers;
