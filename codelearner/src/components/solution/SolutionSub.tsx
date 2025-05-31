import React, { lazy, Suspense, useState } from "react";
import FormPreview from "../lazy/FormPreview";
const UserSolutionForm = lazy(
  () => import("../../features/main/solution/UserSolutionForm")
);

const SolutionSub: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleContent = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="solution-sub d-flex justify-content-center my-3">
        <button
          onClick={toggleContent}
          className=" btn btn-primary toggle-button"
        >
          {isVisible ? "Cancel" : "Create Solution"}
        </button>
      </div>
      <div className="user-solution-form">
        {isVisible && (
          <div className="content">
            <Suspense fallback={<FormPreview />}>
              <UserSolutionForm />
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
};

export default SolutionSub;
