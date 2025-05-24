import React from "react";
import { Card, Tabs, Tab, Badge } from "react-bootstrap";
import { Organization } from "../../../types/user.type";
import { useOutletContext } from "react-router-dom";
import CreateCourseForm from "../../form/CreateCourseForm";
import OrgHeadCourse from "../../courses/OrgHeadCourse";
import { useUserOrgs } from "../../../features/hooks/orgs/useUserOrg";

const DashBoardCourse: React.FC = () => {
  const [key, setKey] = React.useState("your-moderate");
  const token = useOutletContext() as string | null;
  const { orgs, loading } = useUserOrgs(token!);

  const organizations = orgs as Organization[];
  if (loading) {
    return (
      <Card className="shadow-sm">
        <Card.Body>Loading...</Card.Body>
      </Card>
    );
  }

  return (
    <div className="dashboard-course">
      <h2 style={{ lineHeight: 1 }}>
        Courses <Badge bg="success">Head</Badge>
      </h2>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "")}
        className="mb-3 mt-4"
      >
        {/* 
        <Tab eventKey="default" title="All enrolled course">
          
        </Tab>
            */}
        <Tab eventKey="your-moderate" title="Owned Courses">
          <OrgHeadCourse />
        </Tab>
        <Tab eventKey="create" title="Create course">
          {organizations && <CreateCourseForm orgs={organizations} />}
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashBoardCourse;
