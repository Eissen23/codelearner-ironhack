import React from "react";
import { useModList } from "../../../features/hooks/orgs/useModList";
import { Spinner } from "react-bootstrap";
import ModeratorItem from "../element/ModeratorItem";

type ModOrgCred = {
  org_id: string;
  token: string;
  role?: string;
};

const ModeratorOrg: React.FC<ModOrgCred> = ({
  org_id,
  token,
  role = "UNAUTHORIZE",
}) => {
  const { mods, loading } = useModList(org_id, token);

  return (
    <div className="moderator-org">
      <h4>Moderator Organization</h4>

      {loading ? (
        <>
          <Spinner animation="border" />
        </>
      ) : (
        <div className="moderator_list">
          {mods?.map((mod, index) => (
            <ModeratorItem
              mod={mod}
              key={index}
              settings={role === "OrgHead"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModeratorOrg;
