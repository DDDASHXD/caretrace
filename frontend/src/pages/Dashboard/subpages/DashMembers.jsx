import React from "react";
import Input from "../../../components/Input/Input";
import axios from "axios";
import { Trash } from "tabler-icons-react";
import { io } from "socket.io-client";

const DashMembers = (props) => {
  const [memberName, setMemberName] = React.useState("");
  const [memberSurname, setMemberSurname] = React.useState("");
  const [members, setMembers] = React.useState([]);

  const addMember = async () => {
    await axios
      .post("http://172.20.10.3:5000/addMember", {
        owner: props.user.email,
        name: memberName,
        surname: memberSurname,
      })
      .then((e) => {
        console.log(e.data.msg);
        setMembers([...members, e.data.member]);
      })
      .catch((e) => {
        console.error(e.data);
      });
  };

  const getMembers = async () => {
    console.log("user.email", props.user.name);
    let newMembers = [];
    await axios
      .get(`http://172.20.10.3:5000/getMembers?owner=${props.user.email}`)
      .then((e) => {
        console.log(e.data);
        setMembers(
          e.data.map((member) => ({
            ...member,
            x: 0,
            y: 0,
            geoSafe: true,
            battery: 100,
          }))
        );
      })
      .catch((e) => {
        console.error(e.data);
      });

    console.log("newMembers", newMembers);

    newMembers.forEach((member) => {
      setMembers([...members, { ...member, x: 0, y: 0, geoSafe: true }]);
    });
  };

  const deleteMember = async (id) => {
    await axios
      .post(`http://172.20.10.3:5000/deleteMember?id=${id}`)
      .then((e) => {
        getMembers();
      })
      .catch((e) => {
        console.error(e.data);
      });
  };

  React.useEffect(() => {
    const socket = io("ws://172.20.10.3:5050");
    socket.on("coords", (e) => {
      const newMembers = members.map((member) => {
        if (member._id == e.member) {
          if (!e.geoSafe) {
            alert("Citizen is outside of geofence!");
          }
          return { ...member, x: e.x, y: e.y, geoSafe: e.geoSafe };
        } else {
          return member;
        }
      });
      setMembers(newMembers);
    });

    socket.on("battery", (e) => {
      const newMembers = members.map((member) => {
        if (member._id == e.member) {
          if (e.battery < 20) {
            alert("Citizen's battery is low!");
          }
          return { ...member, battery: e.battery };
        } else {
          return member;
        }
      });
      setMembers(newMembers);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [members]);

  React.useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="DashMembers">
      <h1>Citizens</h1>
      <div className="addMember">
        <Input
          placeholder="New Citizen Name"
          onChange={(e) => setMemberName(e.target.value)}
          value={memberName}
        />
        <Input
          placeholder="New Citizen Surame"
          onChange={(e) => setMemberSurname(e.target.value)}
          value={memberSurname}
        />
        <button onClick={() => addMember()}>Add user</button>
      </div>
      <table>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Coordinates</th>
          <th>GeoSafe</th>
          <th>Battery</th>
          <th>Actions</th>
          <th>ID</th>
        </tr>
        {members.map((member) => (
          <tr>
            <td>{member.name}</td>
            <td>{member.surname}</td>
            <td
              style={{
                color: member.geoSafe ? "var(--brand)" : "var(--danger)",
              }}
            >
              x: {member.x} y: {member.y}
            </td>
            <td>{member.geoSafe ? "Safe" : "Not safe"}</td>
            <td>{member.battery}%</td>
            <td className="actions">
              <button
                className="delete"
                onClick={() => deleteMember(member._id)}
              >
                <Trash size={14} color="var(--danger)" />
              </button>
            </td>
            <td>{member._id}</td>
          </tr>
        ))}
        {members.length == 0 && (
          <tr>
            <td colSpan="7">You currently have no citizens registered.</td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default DashMembers;
