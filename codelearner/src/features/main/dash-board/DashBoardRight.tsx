import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { User } from "../../../types/feature-data/auth.types";

interface DashBoardRightProps {
  userInfo?: User;
}

const defaultUserInfo: User = {
  id: 1,
  email: "email here ",
  full_name: "name here",
  account_name: "account name here",
  created_at: new Date("2023-01-01"),
  updated_at: new Date("2023-01-01"),
  about: "Software developer passionate about creating great user experiences.",
};

const DashBoardRight: React.FC<DashBoardRightProps> = ({
  userInfo = defaultUserInfo,
}) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">User Information</h4>
        <Row className="mb-3">
          <Col sm={4}>
            <strong>Name:</strong>
          </Col>
          <Col sm={8}>{userInfo.full_name}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <strong>Email:</strong>
          </Col>
          <Col sm={8}>{userInfo.email}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <strong>Account Name:</strong>
          </Col>
          <Col sm={8}>{userInfo.account_name}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <strong>Created Date:</strong>
          </Col>
          <Col sm={8}>{new Date(userInfo.created_at).toLocaleDateString()}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <strong>About:</strong>
          </Col>
          <Col sm={8}>{userInfo.about}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DashBoardRight;
