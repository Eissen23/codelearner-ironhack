import { Button, Card, Spinner } from "react-bootstrap";
import { useOrgDetail } from "../../../features/hooks/orgs/useOrgDetail";
import { toast, ToastContainer } from "react-toastify";
import { joinOrgs } from "../../../service/user-service/join/joinOrgs";
import { getAuthToken } from "../../../config/loader/getLocalItem";
import { leaveOrg } from "../../../service/user-service/join/leaveOrg";

const OrgInfo = ({ id }: { id: string }) => {
  const token = getAuthToken();
  const { loading, data, role_owner, setRole } = useOrgDetail(id, token!);

  const handleJoin = async () => {
    try {
      await toast.promise(joinOrgs(id!, token!), {
        pending: "Joining",
        success: "Join success \n Now pending",
        error: "You have already joined",
      });
      setRole("Pending");
    } catch (error) {
      console.log("handleEnroll", error);
    }
  };

  const handleLeave = async () => {
    if (role_owner === "OrgHead") {
      alert("You need to assign another one as Head of Organization");
      return;
    }
    try {
      await toast.promise(leaveOrg(id, token!), {
        pending: "Leaving",
        success: "Leave organization success",
        error: "Error leaving organization",
      });
      setRole("UNAUTHORIZE");
    } catch (error) {
      console.log("error handleLeave", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-3">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!data) {
    return (
      <Card.Body>
        <Card.Text>No organization data available.</Card.Text>
      </Card.Body>
    );
  }

  return (
    <>
      <ToastContainer />
      <Card className="OrgInfo">
        <Card.Header as={"h5"}>{data.name || ""}</Card.Header>
        <Card.Body className="org-details">
          <Card.Text>{data.description}</Card.Text>
          <Card.Text>
            <strong>Email:</strong> {data.contact_email}
          </Card.Text>
          {data.website && (
            <Card.Text>
              <strong>Website:</strong>
              {data.website}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Created in:</strong>{" "}
            {new Date(data.created_at).toLocaleDateString()}
          </Card.Text>

          {role_owner === "UNAUTHORIZE" && (
            <Button variant="primary" size="sm" onClick={handleJoin}>
              Join Organization
            </Button>
          )}

          {role_owner === "Pending" && (
            <div className="d-flex gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleJoin}
                disabled
              >
                Pending ...
              </Button>
              <Button variant="danger" size="sm" onClick={handleLeave}>
                Cancel request
              </Button>
            </div>
          )}

          {(role_owner === "Moderator" || role_owner === "OrgHead") && (
            <div className="d-flex gap-3">
              <Button variant="secondary" size="sm" onClick={handleJoin}>
                View Details
              </Button>
              <Button variant="danger" size="sm" onClick={handleLeave}>
                Leave Organization
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default OrgInfo;
