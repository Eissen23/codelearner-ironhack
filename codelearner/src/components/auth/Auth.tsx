import { Button, Modal } from "react-bootstrap";
import LoginForm from "../form/LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const switchToSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <Button
        variant="dark"
        className="text-white rounded-pill"
        onClick={handleShow}
      >
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body>
          <LoginForm onSwitchToSignUp={switchToSignUp} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Auth;
