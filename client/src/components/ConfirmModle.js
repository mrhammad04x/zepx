import React from "react";
import "../assets/css/components/confirmmodal.css"; // You can customize this CSS

const ConfirmModal = ({ isOpen, onClose, onConfirm, title = "Are you sure?", message = "Do you really want to proceed?" }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-container">
        <h3 className="confirm-modal-title">{title}</h3>
        <p className="confirm-modal-message">{message}</p>
        <div className="confirm-modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i> Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            <i className="fa-solid fa-check"></i> Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
