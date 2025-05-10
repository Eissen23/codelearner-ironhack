import CourseList from "../../features/main/course/CourseList";
import LayoutHome from "../../layout/LayoutHome";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import CreateCourseForm from "../../components/form/CreateCourseForm";
import { useAuth } from "../../context/auth/AuthContext";
import Filter from "../../features/main/filter/Filter";
const CoursePage = () => {
  const [key, setKey] = useState("home");
  const { isAuthenticated } = useAuth();
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
        {isAuthenticated && (
          <Tab eventKey="Create" title="Create">
            <CreateCourseForm />
          </Tab>
        )}
      </Tabs>
    </LayoutHome>
  );
};

export default CoursePage;
