import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SettingMain: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <h2>Settings</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="setting-section">
            <h3>General Settings</h3>
            {/* Add your general settings content here */}
          </div>
        </Col>
        <Col md={6}>
          <div className="setting-section">
            <h3>Profile Settings</h3>
            {/* Add your profile settings content here */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="setting-section">
            <h3>Additional Settings</h3>
            {/* Add your additional settings content here */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingMain;
