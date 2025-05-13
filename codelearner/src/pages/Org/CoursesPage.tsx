import CourseList from "../../components/courses/CourseList";
import LayoutHome from "../../layout/LayoutHome";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import Filter from "../../features/main/filter/Filter";
import { useAuth } from "../../context/auth/AuthContext";
import OrgHeadCourse from "../../components/courses/OrgHeadCourse";
const CoursePage = () => {
  const [key, setKey] = useState("home");
  const { token } = useAuth();
  return (
    <LayoutHome>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "")}
        className="mb-3 mt-4"
      >
        <Tab eventKey="home" title="Home">
          <Filter />
          <CourseList />
        </Tab>
        {token && (
          <Tab eventKey="YourOrg" title="Your Org">
            <OrgHeadCourse />
          </Tab>
        )}
      </Tabs>
    </LayoutHome>
  );
};

export default CoursePage;
