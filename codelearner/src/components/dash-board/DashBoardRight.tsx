import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { User } from "../../types/auth.types";
import { useOutletContext } from "react-router";
import { UserDetail } from "../../types/user.type";

interface DashBoardRightProps {
  userInfo?: User;
}

const DashBoardRight: React.FC<DashBoardRightProps> = () => {
  const userInfo = useOutletContext() as UserDetail | null;

  if (!userInfo) {
    return (
      <Card className="shadow-sm">
        <Card.Body>Loading...</Card.Body>
      </Card>
    );
  }

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
