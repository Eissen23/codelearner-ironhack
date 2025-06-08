import React from "react";
import { useOutletContext } from "react-router";
import { Organization } from "../../../types/user.type";
import { Badge, Spinner, Tab, Tabs } from "react-bootstrap";
import ProblemSetHead from "../../problemset/ProblemSetHead";
import CreateProblemSet from "../../form/CreateProblemSet";
import { useUserOrgs } from "../../../features/hooks/orgs/useUserOrg";

const DashBoardProblemSet: React.FC = () => {
  const [key, setKey] = React.useState("your-moderate");
  const token = useOutletContext() as string | null;
  const { orgs, loading } = useUserOrgs(token!);

  const organizations = orgs?.org_managed as Organization[];

  if (loading) {
    return (
      <>
        <h2 style={{ lineHeight: 1 }}>
          Problem Set <Badge bg="success">Head</Badge>
        </h2>
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
    <div className="dashboard-problemset">
      <h2 style={{ lineHeight: 1 }}>
        Problem Set <Badge bg="success">Head</Badge>
      </h2>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "")}
        className="mb-3 mt-4"
      >
        <Tab eventKey="your-moderate" title="Owned ProblemSet">
          <ProblemSetHead />
        </Tab>
        <Tab eventKey="create" title="Create Problem Set">
          {organizations && <CreateProblemSet orgs={organizations} />}
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashBoardProblemSet;
