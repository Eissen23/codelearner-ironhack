import { Alert, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";

function Logout() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { logout } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Button
        variant="dark"
        className="text-white rounded-pill"
        onClick={handleShow}
      >
        Logout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body>
            <Alert variant="danger">
                Are you sure you want to logout?
            </Alert>
            <Button className="mt-3 w-100 btn btn-danger"  onClick={handleLogout}>
                Logout
            </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Logout;
