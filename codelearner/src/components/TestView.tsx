import React from "react";

import ProblemForm from "../features/main/problems/ProblemsForm";
import LayoutAdmin from "../layout/LayoutAdmin";
// import CreateOrganizationForm from "../components/form/CreateOrganizationForm";
// import CreateCourseForm from "../components/form/CreateCourseForm";

const TestView: React.FC = () => {
  return (
    <LayoutAdmin>
      <ProblemForm />
    </LayoutAdmin>
  );
};

export default TestView;
