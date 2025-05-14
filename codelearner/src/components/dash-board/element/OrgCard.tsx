import { Organization } from "../../../types/user.type";
import { Card, Badge } from "react-bootstrap";

const OrgCard: React.FC<{ org: Organization }> = ({ org }) => {
  return (
    <Card className="h-100 shadow-sm hover-shadow">
      {org.logo && (
        <Card.Img
          variant="top"
          src={org.logo}
          alt={`${org.name} logo`}
          style={{
            height: "200px",
            objectFit: "contain",
            padding: "1rem",
          }}
        />
      )}
      <Card.Body>
        <Card.Title>
          <a
            href={`org-manage/${org.id}`}
            className="text-decoration-none text-dark"
          >
            {org.name}
          </a>
        </Card.Title>
        <Card.Text>
          Role:{" "}
          {org.pivot.role === "OrgHead" ? (
            <Badge bg="warning">{org.pivot.role}</Badge>
          ) : (
            <Badge bg="primary">{org.pivot.role}</Badge>
          )}
        </Card.Text>
        <Card.Text>{org.description}</Card.Text>
        {(org.contact_email || org.website) && (
          <div className="text-muted">
            {org.contact_email && (
              <p className="mb-1">Contact: {org.contact_email}</p>
            )}
            {org.website && (
              <a
                href={org.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm"
              >
                Visit Website
              </a>
            )}
          </div>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        <small>
          Last updated: {new Date(org.updated_at).toLocaleDateString()}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default OrgCard;
