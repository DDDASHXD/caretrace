import React from "react";
import { useModal } from "../../../helpers/ModalManager";

const DashHome = (props) => {
  const { create, close } = useModal();

  const openModal = () => {
    const id = Date.now();
    create({
      id,
      title: "Test",
      body: <p>This is a test modal</p>,
      close: "Close",
      onClose: () => close(id),
      confirm: "Confirm",
      onConfirm: () => {
        console.log("Confirmed");
        close(id);
      },
    });
  };

  return (
    <div className="DashHome">
      <h1>Home</h1>
      <h3>Welcome back, {props.user.name}</h3>
      <div className={`indicator ${props.user.isVerified ? "verified" : ""}`}>
        {props.user.isVerified ? "Verified" : "Not verified"}
      </div>
      <button onClick={() => openModal()}>Open</button>
    </div>
  );
};

export default DashHome;
