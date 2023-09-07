import React from "react";
import axios from "axios";
import "./Confirm.scss";

import { useParams } from "react-router-dom";

const Confirm = () => {
  const [confirmed, setConfirmed] = React.useState(false);
  const { token } = useParams();

  React.useEffect(() => {
    console.log("token", token);
    const confirmUser = async () => {
      await axios
        .get(`http://localhost:5000/confirm/${token}`)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
      setConfirmed(true);
    };

    confirmUser();
  }, []);
  return (
    <div className="confirm">
      {confirmed ? <h1>Confirmed!</h1> : <h1>Confirming...</h1>}
    </div>
  );
};

export default Confirm;
