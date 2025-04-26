import { Button, Modal } from "react-bootstrap";
import LoginForm from "../form/LoginForm";
import SignUpForm from "../form/SignUpForm";
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
        variant="secondary"
        className="text-white px-5 py-2 rounded"
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
