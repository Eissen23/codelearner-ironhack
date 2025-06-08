import { Alert, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";
function Logout() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { logout } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = async () => {
    const response = logout();

    toast.promise(response, {
      pending: "Logging out...",
      success: `You have been logged out successfully!`,
      error: "Logout failed. Please try again.",
    });

    await response;
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <>
      <Button
        variant="link"
        size="sm"
        className="w-100 text-start text-decoration-none text-dark fs-6 p-0"
        onClick={handleShow}
      >
        Logout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body>
          <Alert variant="danger">Are you sure you want to logout?</Alert>
          <Button className="mt-3 w-100 btn btn-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Logout;
