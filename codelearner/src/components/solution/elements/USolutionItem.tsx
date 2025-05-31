import React from "react";
import { UserSolution } from "../../../types/content/solution.type";
import { getVersionName } from "../../../data/LanguageVersion";
import { Link } from "react-router";
import { Button } from "react-bootstrap";

const USolutionItem: React.FC<{ us: UserSolution }> = ({ us }) => {
  return (
    <div className="d-flex justify-content-between user_solution_item">
      <h4 className="fs-6 mb-0">{us.name}</h4>
      <div
        className={
          us.status === "published" ? "badge bg-success" : "badge bg-secondary"
        }
      >
        {us.status}
      </div>
      <div>{getVersionName(us.user_submission?.language_id || 0)}</div>
      <div className="button-group">
        <Link
          className="text-reset text-decoration-none"
          to={`/setting/user-solution/${us.id}`}
        >
          <Button variant="light" size="sm">
            <i className="bi bi-eye"></i>
          </Button>
        </Link>

        <Link
          className="text-reset text-decoration-none"
          to={`/setting/user-solution/${us.id}`}
        >
          <Button variant="light" size="sm">
            <i className="bi bi-trash text-danger"></i>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default USolutionItem;
