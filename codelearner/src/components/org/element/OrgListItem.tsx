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
          <Col xs={1} className="text-center">
            {org.logo ? (
              <img
                src={org.logo}
                alt={org.name}
                className="img-fluid rounded"
                style={{ maxHeight: "4rem", objectFit: "contain" }}
              />
            ) : (
              <div className="bg-light rounded">
                <i className="bi bi-building fs-6 text-muted"></i>
              </div>
            )}
          </Col>
          <Col xs={4}>
            <Link to={uri} className="text-decoration-none">
              <Card.Title className="fs-6 clamp-1">{org.name}</Card.Title>
            </Link>
          </Col>
          <Col xs={2} className="text-end">
            {org.pivot && (
              <Badge bg={getBadgeVariant2(org.pivot.role)}>
                {org.pivot.role}
              </Badge>
            )}
          </Col>

          <Col xs={2}>
            <div className="text-muted">
              {new Date(org.created_at).toLocaleDateString()}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrgListItem;
