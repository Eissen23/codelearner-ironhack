import React from "react";
import { Tabs, Tab, Accordion, Spinner } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import CreateOrganizationForm from "../../form/CreateOrganizationForm";
import { useUserOrgs } from "../../../features/hooks/orgs/useUserOrg";
import OrgListItem from "../../org/element/OrgListItem";

const DashBoardOrg: React.FC = () => {
  const [key, setKey] = React.useState("default");
  const token = useOutletContext() as string | null;
  const { orgs, loading } = useUserOrgs(token!);
  if (loading) {
    return (
      <>
        <h4 style={{ lineHeight: 1 }}>Organizations</h4>
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner animation="border" role="status"></Spinner>
        </div>
      </>
    );
  }

  return (
    <div className="dashboard-org">
      <div className="d-flex justify-content-between mb-4">
        <h4 style={{ lineHeight: 1 }}>Organizations</h4>
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
                {orgs &&
                  orgs.org_managed.map((org) => (
                    <OrgListItem key={org.id} org={org} setting />
                  ))}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Moderated Organizations</Accordion.Header>
              <Accordion.Body>
                {orgs &&
                  orgs.org_mod.map((org) => (
                    <OrgListItem key={org.id} org={org} setting />
                  ))}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Pending Organizations</Accordion.Header>
              <Accordion.Body>
                {orgs &&
                  orgs.org_pending.map((org) => (
                    <OrgListItem key={org.id} org={org} setting />
                  ))}
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
