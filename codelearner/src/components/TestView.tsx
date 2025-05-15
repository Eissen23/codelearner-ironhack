import React from "react";

import LayoutHome from "../layout/LayoutHome";
import ArticleForm from "../features/main/article/ArticleForm";
// import CreateOrganizationForm from "../components/form/CreateOrganizationForm";
// import CreateCourseForm from "../components/form/CreateCourseForm";

const TestView: React.FC = () => {
  return (
    <LayoutHome>
      <ArticleForm />
    </LayoutHome>
  );
};

export default TestView;
