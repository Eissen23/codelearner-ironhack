import React from "react";
import { useUSolutionInfo } from "../../features/hooks/solution/useUSolutionInfo";
import { Spinner } from "react-bootstrap";
import UserSolutionForm from "../../features/main/solution/UserSolutionForm";
import LayoutHome from "../../layout/LayoutHome";
import { useParams } from "react-router";

const UserSolutionPage: React.FC = () => {
    const { user_solution_id } = useParams();
  const { loading, user_solution } = useUSolutionInfo(user_solution_id!);
  return (
    <LayoutHome>
      {loading ? (
        <div className="d-flex justify-content-center h-100 align-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <section className="solution_article_info">
          <h2 className="fs-3 mb-4">Update your solution</h2>
          <div
            className={`bg-body-secondary ${
              user_solution?.status === "published"
                ? "text-success"
                : "text-secondary"
            }`}
          >
            <strong>State of public: </strong>
            {user_solution?.status}
          </div>
          <UserSolutionForm
            initialData={user_solution}
            update
            editable={user_solution?.status === "published"}
          />
        </section>
      )}
    </LayoutHome>
  );
};

export default UserSolutionPage;
