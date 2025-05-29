import React from "react";
import { Org } from "../../../types/org/org.type";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router";
import { getBadgeVariant2 } from "../../../utils/solutions/getBadgeVariant";

const OrgListItem: React.FC<{ org: Org; setting?: boolean }> = ({
  org,
  setting = false,
}) => {
  const uri = setting ? `/dashboard/org_manage/${org.id}` : `/orgs/${org.id}`;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row>
          <Col xs={2} className="text-center">
            {org.logo ? (
              <img
                src={org.logo}
                alt={org.name}
                className="img-fluid rounded"
                style={{ maxHeight: "4rem", objectFit: "contain" }}
              />
            ) : (
              <div className="bg-light rounded p-3">
                <i className="bi bi-building fs-4 text-muted"></i>
              </div>
            )}
          </Col>
          <Col xs={7}>
            <Link to={uri} className="text-decoration-none">
              <Card.Title className="mb-2">{org.name}</Card.Title>
            </Link>
            <Card.Text className="text-muted mb-2 clamp-1">
              {org.description}
            </Card.Text>
            {/* 
            <div className="d-flex gap-2 align-items-center">
              <small className="text-muted">
                <i className="bi bi-envelope me-1"></i>
                {org.contact_email}
              </small>
              {org.website && (
                <small>
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <i className="bi bi-link-45deg me-1"></i>
                    Website
                  </a>
                </small>
              )}
            </div>
                  */}
          </Col>
          <Col xs={3} className="text-end">
            {org.pivot && (
              <Badge bg={getBadgeVariant2(org.pivot.role)}>
                {org.pivot.role}
              </Badge>
            )}
            <div className="mt-2">
              <small className="text-muted">
                Created: {new Date(org.created_at).toLocaleDateString()}
              </small>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrgListItem;
