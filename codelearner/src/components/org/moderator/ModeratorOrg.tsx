import React from "react";
import { useModList } from "../../../features/hooks/orgs/useModList";
import { Button, Spinner, Tab, Tabs } from "react-bootstrap";
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
  const { mods, pendings, oneSelf, loading, refreshComp } = useModList(
    org_id,
    token
  );

  return (
    <div className="moderator-org">
      <div className="row g-0 mb-3">
        <div className="col-12 col-md-10">
          <h4>Moderator Organization</h4>
        </div>
        <div className="col-12 col-md-2 text-center">
          <Button variant="outline-primary" onClick={refreshComp}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
        </div>
      </div>

      {loading ? (
        <>
          <Spinner animation="border" />
        </>
      ) : (
        <>
          <h5 className="mb-3 text-bg-info p-2 fs-6">Your info</h5>
          {oneSelf && <ModeratorItem mod={oneSelf!} />}
          <h5 className="my-3 text-bg-info p-2 fs-6">All Moderator list</h5>
          <Tabs defaultActiveKey="in-org">
            <Tab title="Currently Active" eventKey="in-org">
              <div className="moderator_list mt-3">
                {mods?.length === 0 ? (
                  <p className="text-bg-primary p-3">
                    Looks like you're the only one 😉
                  </p>
                ) : (
                  mods?.map((mod, index) => (
                    <ModeratorItem
                      mod={mod}
                      key={index}
                      settings={role === "OrgHead"}
                      org_id={org_id}
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
                      org_id={org_id}
                    />
                  ))
                )}
              </div>
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ModeratorOrg;
