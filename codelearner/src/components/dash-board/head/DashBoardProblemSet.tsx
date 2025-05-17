import React from "react";
import { useOutletContext } from "react-router";
import { UserDetail } from "../../../types/user.type";
import { Card, Tab, Tabs } from "react-bootstrap";
import ProblemSetHead from "../../problemset/ProblemSetHead";
import CreateProblemSet from "../../form/CreateProblemSet";

const DashBoardProblemSet: React.FC = () => {
  const [key, setKey] = React.useState("your-moderate");
  const userInfo = (useOutletContext() as UserDetail) || null;

  if (!userInfo) {
    return (
      <Card className="shadow-sm">
        <Card.Body>Loading...</Card.Body>
      </Card>
    );
  }

  const orgs = userInfo.organizations;

  return (
    <div className="dashboard-problemset">
      <h2 style={{ lineHeight: 1 }}>Problem Set</h2>
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
          <CreateProblemSet orgs={orgs || []} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashBoardProblemSet;
