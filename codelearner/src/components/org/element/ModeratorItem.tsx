import React from "react";
import { UserModerator } from "../../../types/user.type";
import { Badge, Button } from "react-bootstrap";
import { getBadgeVariant2 } from "../../../utils/solutions/getBadgeVariant";

const ModeratorItem: React.FC<{ mod: UserModerator; settings?: boolean }> = ({
  mod,
  settings = false,
}) => {
  const handleView = async () => {
    // Handle view action
    console.log(`Viewing moderator: ${mod.full_name}`);
  };

  const handleDelete = async () => {
    // Handle delete action
    console.log(`Deleting moderator: ${mod.full_name}`);
  };

  return (
    <div className="moderator-item">
      <div className="logo">
        {mod.logo ? (
          <img src={mod.logo} alt={mod.full_name} />
        ) : (
          <div className="p-1 rounded-circle">
            <i className="bi bi-person-circle"></i>
          </div>
        )}
      </div>
      <div className="name">
        <h5 className="fs-6 mb-0">{mod.full_name}</h5>
      </div>
      <div className="email">
        <p className="mb-0">{mod.email}</p>
      </div>
      <div className="created-at">
        <small> {new Date(mod.created_at).toLocaleDateString()}</small>
      </div>
      <div className="role">
        <Badge bg={getBadgeVariant2(mod.role)}>{mod.role}</Badge>
      </div>
      {settings && (
        <div className="d-flex justify-content-center gap-2">
          <Button variant="light" size="sm" onClick={handleView}>
            <i className="bi bi-eye "></i>
          </Button>
          <Button variant="light" size="sm" onClick={handleDelete}>
            <i className="bi bi-x-square-fill text-danger"></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ModeratorItem;
