import { Card, Col } from "react-bootstrap";
import { Org } from "../../../types/org/org.type";
import React from "react";

const OrgCardItem: React.FC<{ organizations: Org }> = ({ organizations }) => {
  return (
    <Col key={organizations.id}>
      <Card className="h-100 shadow-sm hover-shadow">
        <Card.Img
          variant="top"
          src={
            organizations.logo ??
            `https://placehold.co/200x200?text=${organizations.name}`
          }
          alt={`${organizations.name} logo`}
          style={{
            height: "200px",
            objectFit: "cover",
            padding: "1rem",
          }}
        />
        <Card.Body>
          <Card.Title>
            <a
              href={`/orgs/${organizations.id}`}
              className="text-decoration-none text-dark"
            >
              {organizations.name}
            </a>
          </Card.Title>
          <Card.Text>{organizations.description}</Card.Text>
          <div className="text-muted">
            <p className="mb-1">Contact: {organizations.contact_email}</p>
            {organizations.website && (
              <a
                href={organizations.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm"
              >
                Visit Website
              </a>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <small>
            Last updated:{" "}
            {new Date(organizations.updated_at).toLocaleDateString()}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default OrgCardItem;
