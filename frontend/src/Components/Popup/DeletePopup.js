const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="delete-popup">
      <div className="popup-content">
        <p>Are you sure you want to delete?</p>
        <div>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
