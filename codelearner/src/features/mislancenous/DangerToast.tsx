import React from "react";
import { Toast } from "react-bootstrap";

const DangerToast = (message: string) => {
  const [show, setShow] = React.useState(true);
  return (
    <Toast
      show={show}
      onClose={() => setShow(false)}
      autohide
      className="position-fixed top-0 end-0 m-3"
      bg="danger"
    >
      <Toast.Header closeButton>
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default DangerToast;
