import React from "react";
import { Card, Row, Alert, Tabs, Tab } from "react-bootstrap";
import { UserDetail } from "../../types/user.type";
import { useOutletContext } from "react-router-dom";
import CourseCard from "./element/CourseCard";
import CreateCourseForm from "../form/CreateCourseForm";
import OrgHeadCourse from "../courses/OrgHeadCourse";

const DashBoardCourse: React.FC = () => {
  const [key, setKey] = React.useState("default");
  const userInfo = useOutletContext() as UserDetail | null;

  if (!userInfo) {
    return (
      <Card className="shadow-sm">
        <Card.Body>Loading...</Card.Body>
      </Card>
    );
  }

  const courses = userInfo.courses;
  const orgs = userInfo.organizations;

  return (
    <div className="dashboard-course">
      <h2 style={{ lineHeight: 1 }}>Courses</h2>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "")}
        className="mb-3 mt-4"
      >
        <Tab eventKey="default" title="All enrolled course">
          {courses.length != 0 ? (
            <Row xs={1} md={2} className="g-4">
              {courses.map((course) => (
                <CourseCard course={course} />
              ))}
            </Row>
          ) : (
            <Alert variant="info">No courses....</Alert>
          )}
        </Tab>
        <Tab eventKey="your-moderate" title="Your Moderating Course">
          <OrgHeadCourse />
        </Tab>
        <Tab eventKey="create" title="Create course">
          <CreateCourseForm orgs={orgs || []} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashBoardCourse;
