import React from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useUserOrgs } from "../../../features/hooks/orgs/useUserOrg";
import OrgCard from "../../dash-board/element/OrgCard";
import { Organization } from "../../../types/user.type";

const UserOrg: React.FC<{ token?: string }> = ({ token = "" }) => {
  const { loading, orgs } = useUserOrgs(token);

  if (loading) {
    return (
      <Spinner
        animation="border"
        role="status"
        className="d-block mx-auto my-5"
      />
    );
  }

  if (!orgs) {
    return (
      <Alert variant="danger" className="m-3">
        No data ....
      </Alert>
    );
  }

  return (
    <div className="user_org">
      <Container className="py-4">
        <Row xs={1} md={2} lg={3} className="g-4">
          {orgs.org_managed.map((organizations) => (
            <Col key={`org-${organizations.id}`}>
              <OrgCard org={organizations as Organization} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default UserOrg;
