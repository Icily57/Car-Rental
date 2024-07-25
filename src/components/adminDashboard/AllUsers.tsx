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
        <AiOutlineLoading3Quarters className="animate-spin text-green-300 text-4xl" />
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
    <div className="overflow-x-auto text-base-content bg-blue-200 rounded-lg p-4 shadow-lg">
      <table className="table w-full">
        <thead className="text-base-content bg-gray-200">
          <tr>
            <th className="text-green-500 py-2">Full Name</th>
            <th className="text-green-500 py-2">Email</th>
            <th className="text-green-500 py-2">Contact</th>
            <th className="text-green-500 py-2">Address</th>
            <th className="text-green-500 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-2">
                <div className="font-bold text-green-500">{user.full_name}</div>
              </td>
              <td className="py-2">
                <div className="text-sm opacity-70">{user.email}</div>
              </td>
              <td className="py-2">{user.contact_phone}</td>
              <td className="py-2">{user.address}</td>
              <td className="py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
