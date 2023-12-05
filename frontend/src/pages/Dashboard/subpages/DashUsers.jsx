import React from "react";
import axios from "axios";
import { Trash, Pencil } from "tabler-icons-react";
import { useModal } from "../../../helpers/ModalManager";
import Input from "../../../components/Input/Input";

const DashUsers = (props) => {
  const [users, setUsers] = React.useState([]);
  const { create, close } = useModal();

  const [usernameStatus, setUsernameStatus] = React.useState(null);
  const [nameStatus, setNameStatus] = React.useState(null);
  const [surnameStatus, setSurnameStatus] = React.useState(null);
  const [emailStatus, setEmailStatus] = React.useState(null);
  const [passwordStatus, setPasswordStatus] = React.useState(null);

  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const getUsers = async () => {
    await axios
      .get("http://172.20.10.3:5000/getAllUsers")
      .then((e) => {
        console.log(e.data);
        setUsers(e.data);
      })
      .catch((e) => {
        console.error(e.data);
      });
  };

  const deleteUser = async (id) => {
    await axios
      .post(`http://172.20.10.3:5000/deleteUser?id=${id}`)
      .then((e) => {
        getUsers();
      })
      .catch((e) => {
        console.error(e.data);
      });
  };

  const changeUsername = async (id, modalId) => {
    console.log("id", id);
    console.log("username", username);
    axios
      .post("http://172.20.10.3:5000/changeUsername", {
        id,
        newUsername: username,
      })
      .then((e) => {
        console.log(e.data);
        getUsers();
      })
      .catch((e) => {
        console.error(e.data);
      });
  };

  const openEditModal = async (userId) => {
    const id = Date.now();
    create({
      id,
      title: "Edit user",
      body: (
        <div className="editUser">
          <div className="row">
            <Input
              placeholder="Change username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button
              className="confirm"
              onClick={(ev) => {
                changeUsername(userId, id);
              }}
            >
              Confirm
            </button>
            <p>Username: {username}</p>
          </div>
          <div className="row">
            <Input placeholder="Change name" />
            <button className="confirm">Confirm</button>
          </div>
          <div className="row">
            <Input placeholder="Change surname" />
            <button className="confirm">Confirm</button>
          </div>
          <div className="row">
            <Input placeholder="Change email" />
            <button className="confirm">Confirm</button>
          </div>
          <div className="row">
            <Input placeholder="Change password" />
            <button className="confirm">Confirm</button>
          </div>
        </div>
      ),
      close: "Done",
      onClose: () => close(id),
      confirm: false,
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
            <td className="actions">
              <button className="delete" onClick={() => deleteUser(user._id)}>
                <Trash size={14} />
              </button>
              <button className="edit" onClick={() => openEditModal(user._id)}>
                <Pencil size={14} />
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DashUsers;
