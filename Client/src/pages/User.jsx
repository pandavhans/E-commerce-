import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const User = () => {
  const [data, setData] = useState([]);
  const { URL } = useContext(UserContext);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${URL}/api/user/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.user || []); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">All Users</h1>

      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-700 text-white">
            <thead> 
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">ID</th>
                <th className="border border-gray-700 px-4 py-2">Name</th>
                <th className="border border-gray-700 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id} className="hover:bg-gray-700 transition">
                  <td className="border border-gray-700 px-4 py-2">{user._id}</td>
                  <td className="border border-gray-700 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-700 px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-white">No users found.</p>
      )}
    </div>
  );
};

export default User;
