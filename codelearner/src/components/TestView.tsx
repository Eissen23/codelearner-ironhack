import React from "react";

import LayoutAdmin from "../layout/LayoutAdmin";
import ImageSelector from "../features/main/ImageSelector";
// import CreateOrganizationForm from "../components/form/CreateOrganizationForm";
// import CreateCourseForm from "../components/form/CreateCourseForm";

const TestView: React.FC = () => {
  return (
    <LayoutAdmin>
      <ImageSelector onChange={() => {}} />
    </LayoutAdmin>
  );
};

export default TestView;
