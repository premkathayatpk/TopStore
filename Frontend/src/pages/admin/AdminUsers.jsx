import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/getAllUsers", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        // console.log(data.users);
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Users fail to fetch", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <h1>Admin Users</h1>
      {users && users.length > 0 ? (
        <div>
          {users?.map((user) => (
            <div key={user._id}>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AdminUsers;
