import React from "react";
import axios from "axios";
import AccessForm from "../../layouts/AccessForm/AccessForm";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { token } = useParams();

  const submit = () => {
    if (password === confirmPassword) {
      axios
        .post("http://172.20.10.3:5000/resetPassword", {
          token,
          newPassword: password,
        })
        .then((e) => {
          console.log(e.data);
        })
        .catch((e) => {
          console.log(e.data);
        });
    }
  };

  return (
    <AccessForm>
      <div className="ResetPassword inner">
        <h2 className="title">Reset password</h2>
        <Input
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={() => submit()}
          disabled={
            password.length > 7 && confirmPassword.length > 0 ? false : true
          }
        >
          Reset password
        </button>
      </div>
    </AccessForm>
  );
};

export default ResetPassword;
