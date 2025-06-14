import React from "react";
import { Tabs, Tab, Badge, Spinner } from "react-bootstrap";
import { Organization } from "../../../types/user.type";
import { useOutletContext } from "react-router-dom";
import CreateCourseForm from "../../form/CreateCourseForm";
import OrgHeadCourse from "../../courses/OrgHeadCourse";
import { useUserOrgs } from "../../../features/hooks/orgs/useUserOrg";

const DashBoardCourse: React.FC = () => {
  const [key, setKey] = React.useState("your-moderate");
  const token = useOutletContext() as string | null;
  const { orgs, loading } = useUserOrgs(token!);

  const organizations = orgs?.org_managed as Organization[];
  if (loading) {
    return (
      <>
        <h2 style={{ lineHeight: 1 }}>
          Courses <Badge bg="success">Head</Badge>
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
