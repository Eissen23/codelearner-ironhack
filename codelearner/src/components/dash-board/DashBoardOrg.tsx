import React from "react";
import { Card, Row, Col, Alert, Tabs, Tab } from "react-bootstrap";
import { UserDetail } from "../../types/user.type";
import { useOutletContext } from "react-router-dom";
import CreateOrganizationForm from "../form/CreateOrganizationForm";
import OrgCard from "../element/OrgCard";

const DashBoardOrg: React.FC = () => {
  const [key, setKey] = React.useState("default");
  const userInfo = useOutletContext() as UserDetail | null;

  if (!userInfo) {
    return (
      <Card className="shadow-sm">
        <Card.Body>Loading...</Card.Body>
      </Card>
    );
  }

  const organizations = userInfo.organizations;

  return (
    <div className="dashboard-org">
      <div className="d-flex justify-content-between mb-4">
        <h2 style={{ lineHeight: 1 }}>Organizations</h2>
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "")}
        className="mb-3 mt-4"
      >
        <Tab eventKey="default" title="All organization">
          <Row xs={1} md={2} className="g-4">
            {organizations && organizations.map((org) => <OrgCard org={org} />)}
          </Row>
        </Tab>

        <Tab eventKey="Create" title="Create">
          <CreateOrganizationForm />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashBoardOrg;
