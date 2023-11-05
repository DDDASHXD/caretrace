import React from "react";
import axios from "axios";

const DashUsers = (props) => {
  const [users, setUsers] = React.useState([]);

  const getUsers = async () => {
    await axios
      .get("http://localhost:5000/getAllUsers")
      .then((e) => {
        console.log(e.data);
        setUsers(e.data);
      })
      .catch((e) => {
        console.error(e.data);
      });
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="DashUsers">
      <h1>Users</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Verified</th>
          <th>Admin</th>
          <th>Actions</th>
        </tr>
        {users.map((user) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>{user.verified ? "Yes" : "No"}</td>
            <td>{user.admin ? "Yes" : "No"}</td>
            <td className="actions">actions coming soon</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DashUsers;
