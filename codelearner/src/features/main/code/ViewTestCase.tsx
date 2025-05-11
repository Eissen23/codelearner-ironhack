import { TestCase } from "../../../types/content/problem.type";
import { useState } from "react";
import { Modal, Button, Tab, Tabs, Spinner } from "react-bootstrap";

const ViewTestCase: React.FC<{
  testCase?: TestCase;
}> = ({ testCase }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!testCase) {
    return (
      <div className="d-flex justify-content-center p-3">
        <Spinner animation="border" role="status" size="sm"></Spinner>
        <span>Loading</span>
      </div>
    );
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        View Test Case
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Test Case Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey={"code-0"} className="mb-3">
            {testCase.input.map((ip, index) => (
              <Tab
                eventKey={`code-${index}`}
                title={`Test case ${index + 1}`}
                key={index}
              >
                <h6>Input:</h6>
                <pre className="bg-black text-info px-3 py-2">{ip}</pre>

                <h6>Output:</h6>
                <pre className="bg-black text-info px-3 py-2">
                  {testCase.output[index]}
                </pre>
              </Tab>
            ))}
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewTestCase;
