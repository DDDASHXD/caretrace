import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export const ModalManager = ({ children }) => {
  const [modals, setModals] = useState([]);
  const create = (modal) => {
    // Create a new modal
    setModals([...modals, modal]);
  };

  const close = (id) => {
    // Close a modal by id
    setModals(modals.filter((modal) => modal.id !== id));
  };

  return (
    <ModalContext.Provider value={{ create, close }}>
      {children}
      <div className="ModalManager">
        {modals.map((modal, index) => (
          <div key={index} className="modal">
            <div className="bg" onClick={() => modal.onClose()}></div>
            <div className="wrapper">
              <h1 className="modalTitle">{modal.title}</h1>
              <div className="modalBody">{modal.body}</div>
              <div className="buttons">
                <button
                  onClick={() => modal.onClose()}
                  className={`modalBtn close ${
                    modal.closeClass ? modal.closeClass : ""
                  }`}
                >
                  {modal.close}
                </button>
                {modal.confirm && (
                  <button
                    onClick={() => modal.onConfirm()}
                    className={`modalBtn confirm ${
                      modal.confirmClass ? modal.confirmClass : ""
                    }`}
                  >
                    {modal.confirm}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ModalContext.Provider>
  );
};
