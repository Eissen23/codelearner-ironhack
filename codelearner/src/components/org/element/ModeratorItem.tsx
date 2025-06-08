import React, { useState } from "react";
import { UserModerator } from "../../../types/user.type";
import { Badge, Button } from "react-bootstrap";
import { getBadgeVariant2 } from "../../../utils/solutions/getBadgeVariant";
import { showModeratorDetails } from "../../../features/functions/showModeratorDetails";
import { useAuth } from "../../../context/auth/AuthContext";
import { changeMod } from "../../../service/api/org-manage/moderator/changeMod";
import { toast } from "react-toastify";

const ModeratorItem: React.FC<{
  mod: UserModerator;
  settings?: boolean;
  org_id?: string;
}> = ({ mod, settings = false, org_id = "" }) => {
  const { token } = useAuth();
  const [visible, setVisible] = useState(true);
  const handleView = async () => {
    // Handle view action
    showModeratorDetails(mod);
  };

  const updateMod = async (status: "OrgHead" | "Moderator" | "Reject") => {
    const response = changeMod(org_id, token!, mod.id.toString(), status);
    toast.promise(response, {
      pending: "updating",
      success: `Status changed :${status}`,
      error: "Failed to update status",
    });

    await response;
    setVisible(false);
  };

  const handleDelete = () => {
    // Handle delete action
    const allow = confirm("Remove this mod from list?");
    if (!allow) {
      return;
    }

    updateMod("Reject");
    console.log(`Deleting moderator: ${mod.full_name}`);
  };

  const handleApprove = () => {
    updateMod("Moderator");
    console.log(`Adding moderator: ${mod.full_name}`);
  };

  return (
    <div className={`moderator-item ${!visible && "d-none"}`}>
      <div className="logo">
        {mod.image_avatar ? (
          <img
            src={mod.image_avatar}
            alt={mod.full_name}
            className="rounded-circle"
            style={{ height: "30px", width: "30px" }}
          />
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
      <div className="d-flex justify-content-center gap-2">
        <>
          <Button variant="light" size="sm" onClick={handleView}>
            <i className="bi bi-eye "></i>
          </Button>
        </>
        {settings && (
          <>
            {mod.role === "Pending" && (
              <Button variant="light" size="sm" onClick={handleApprove}>
                <i className="bi bi-check-circle-fill text-success"></i>
              </Button>
            )}

            <Button variant="light" size="sm" onClick={handleDelete}>
              <i className="bi bi-x-square-fill text-danger"></i>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModeratorItem;
