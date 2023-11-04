import React from "react";

const DashMembers = () => {
  return (
    <div className="DashHome">
      <h1>Members</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Surname</th>
        </tr>
        <tr>
          <td>John Doe</td>
          <td>john.doe@example.com</td>
        </tr>
        <tr>
          <td>Jane Doe</td>
          <td>jane.doe@example.com</td>
        </tr>
      </table>
    </div>
  );
};

export default DashMembers;
