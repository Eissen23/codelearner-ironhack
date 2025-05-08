import React from "react";

import ProblemSetSlide from "./problemset/ProblemSetsSlide";
import LayoutHome from "../layout/LayoutHome";
// import CreateOrganizationForm from "../components/form/CreateOrganizationForm";
// import CreateCourseForm from "../components/form/CreateCourseForm";

const TestView: React.FC = () => {
  return (
    <LayoutHome>
      <ProblemSetSlide />
    </LayoutHome>
  );
};

export default TestView;
