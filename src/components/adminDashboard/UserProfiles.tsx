import { useEffect, useState } from 'react';
import { usersApi } from '../../features/api/usersApi';
import { FormValues } from '../../types/Types';

const UserProfiles = () => {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;

  return (
    <div className="overflow-x-auto text-base-content bg-base-100 rounded-lg">
      <table className="table">
        {/* head */}
        <thead className="text-base-content">
          <tr>
            <th className="text-green-300">Full Name</th>
            <th className="text-green-300">Email</th>
            <th className="text-green-300">Contact</th>
            <th className="text-green-300">Address</th>
            <th className="text-green-300">Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover">
              <td>
                <div className="font-bold text-green-300">{user.full_name}</div>
              </td>
              <td>
                <div className="text-sm opacity-50">{user.email}</div>
              </td>
              <td>{user.contact_phone}</td>
              <td>{user.address}</td>
              {/* <td>
                <button className="btn btn-ghost btn-xs">details</button>
              </td> */}
            </tr>
          ))}
        </tbody>
       
      </table>
    </div>
  );
}

export default UserProfiles;
