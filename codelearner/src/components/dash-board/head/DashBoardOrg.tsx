import React from "react";
import { Card, Row, Tabs, Tab, Col, Accordion } from "react-bootstrap";
import { Organization } from "../../../types/user.type";
import { useOutletContext } from "react-router-dom";
import CreateOrganizationForm from "../../form/CreateOrganizationForm";
import OrgCard from "../element/OrgCard";
import { useUserOrgs } from "../../../features/hooks/orgs/useUserOrg";

const DashBoardOrg: React.FC = () => {
  const [key, setKey] = React.useState("default");
  const token = useOutletContext() as string | null;
  const { orgs, loading } = useUserOrgs(token!);
  if (loading) {
    return (
      <Card className="shadow-sm">
        <Card.Body>Loading...</Card.Body>
      </Card>
    );
  }

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
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Head Organizations</Accordion.Header>
              <Accordion.Body className="overflow-scroll">
                <Row xs={1} md={2} className="g-4">
                  {orgs &&
                    orgs.org_managed.map((org) => (
                      <Col key={`org_card${org.id}`}>
                        <OrgCard org={org as Organization} />
                      </Col>
                    ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Moderated Organizations</Accordion.Header>
              <Accordion.Body>
                <Row xs={1} md={2} className="g-4">
                  {orgs &&
                    orgs.org_mod.map((org) => (
                      <Col key={`org_card${org.id}`}>
                        <OrgCard org={org as Organization} />
                      </Col>
                    ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Pending Organizations</Accordion.Header>
              <Accordion.Body>
                <Row xs={1} md={2} className="g-4">
                  {orgs &&
                    orgs.org_pending.map((org) => (
                      <Col key={`org_card${org.id}`}>
                        <OrgCard org={org as Organization} />
                      </Col>
                    ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Tab>

        <Tab eventKey="Create" title="Create">
          <CreateOrganizationForm />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashBoardOrg;
