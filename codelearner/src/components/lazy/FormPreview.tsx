import React from "react";
import { Card, Placeholder, Container, Row, Col, Form } from "react-bootstrap";

const FormPreview: React.FC = () => {
  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col md={12} className="mb-4">
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            </Col>

            <Col md={6}>
              <Placeholder as={Form.Label} animation="glow">
                <Placeholder xs={4} />
              </Placeholder>
              <Placeholder as={Form.Control} animation="glow" />

              <Placeholder as={Form.Label} animation="glow" className="mt-3">
                <Placeholder xs={3} />
              </Placeholder>
              <Placeholder as={Form.Control} animation="glow" />
            </Col>

            <Col md={6}>
              <Placeholder as={Form.Label} animation="glow">
                <Placeholder xs={5} />
              </Placeholder>
              <Placeholder as="div" animation="glow">
                <Placeholder xs={12} size="lg" style={{ height: "200px" }} />
              </Placeholder>
            </Col>

            <Col md={12} className="mt-4 text-end">
              <Placeholder.Button variant="primary" xs={2} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormPreview;
