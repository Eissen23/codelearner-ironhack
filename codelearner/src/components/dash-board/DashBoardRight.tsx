import React from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { useUserDetail } from "../../features/hooks/users/useUserDetail";

const DashBoardRight: React.FC = () => {
  const token = useOutletContext() as string | null;
  const userDetail = useUserDetail(token);

  if (!userDetail) {
    return (
      <Card className="shadow-sm">
        <Card.Body>
          <Spinner animation="border" size="sm"></Spinner>
          <span>Loading...</span>
        </Card.Body>
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
          <Col sm={8}>{userDetail.full_name}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <strong>Email:</strong>
          </Col>
          <Col sm={8}>{userDetail.email}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <strong>Account Name:</strong>
          </Col>
          <Col sm={8}>{userDetail.account_name}</Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <strong>Created Date:</strong>
          </Col>
          <Col sm={8}>
            {new Date(userDetail.created_at).toLocaleDateString()}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={4}>
            <strong>About:</strong>
          </Col>
          <Col sm={8}>{userDetail.about}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DashBoardRight;
