import { Card, Spinner } from "react-bootstrap";
import { useOrgDetail } from "../../../features/hooks/orgs/useOrgDetail";

const OrgInfo = ({ id }: { id: string }) => {
  const { loading, data } = useOrgDetail(id);

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
      </Card.Body>
    </Card>
  );
};

export default OrgInfo;
