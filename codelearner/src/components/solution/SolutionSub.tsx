import React, { useState } from "react";
import UserSolutionForm from "../../features/main/solution/UserSolutionForm";

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
            {/* Add your content here */}
            <UserSolutionForm />
          </div>
        )}
      </div>
    </>
  );
};

export default SolutionSub;
