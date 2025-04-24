import { Button, Modal } from "react-bootstrap";
import Login from "../form/Login";
import SignUp from "../form/SignUp";
import { useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   which form is used

  return (
    <>
      <Button
        variant="secondary"
        className="text-white px-5 py-2 rounded"
        onClick={handleShow}
      >
        {isLogin ?  "Login": "Sign Up"}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <Login onSwitchToSignUp={toggleAuthMode} />
          ) : (
            <SignUp onSwitchToLogin={toggleAuthMode} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Auth;
