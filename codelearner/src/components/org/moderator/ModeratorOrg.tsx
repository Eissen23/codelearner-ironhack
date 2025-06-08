import React from "react";
import { useModList } from "../../../features/hooks/orgs/useModList";
import { Spinner, Tab, Tabs } from "react-bootstrap";
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
  const { mods, pendings, loading } = useModList(org_id, token);

  return (
    <div className="moderator-org">
      <h4>Moderator Organization</h4>

      {loading ? (
        <>
          <Spinner animation="border" />
        </>
      ) : (
        <Tabs defaultActiveKey="in-org">
          <Tab title="Currently Active" eventKey="in-org">
            <div className="moderator_list mt-3">
              {mods?.length === 0 ? (
                <p className="text-bg-primary p-3">No available data</p>
              ) : (
                mods?.map((mod, index) => (
                  <ModeratorItem
                    mod={mod}
                    key={index}
                    settings={role === "OrgHead"}
                  />
                ))
              )}
            </div>
          </Tab>
          <Tab title="Awaiting Request" eventKey="awaiting">
            <div className="moderator_list mt-3">
              {pendings?.length === 0 ? (
                <p className="text-bg-primary p-3">No pending requests</p>
              ) : (
                pendings?.map((mod, index) => (
                  <ModeratorItem
                    mod={mod}
                    key={index}
                    settings={role === "OrgHead"}
                  />
                ))
              )}
            </div>
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

export default ModeratorOrg;
