import React from "react";

import LayoutHome from "../layout/LayoutHome";
import ProblemForm from "../features/main/problems/ProblemsForm";
// import CreateOrganizationForm from "../components/form/CreateOrganizationForm";
// import CreateCourseForm from "../components/form/CreateCourseForm";

const TestView: React.FC = () => {
  return (
    <LayoutHome>
      <ProblemForm />
    </LayoutHome>
  );
};

export default TestView;
