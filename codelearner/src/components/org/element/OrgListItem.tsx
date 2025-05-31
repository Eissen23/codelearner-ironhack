import React from "react";
import { Org } from "../../../types/org/org.type";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router";
import { getBadgeVariant2 } from "../../../utils/solutions/getBadgeVariant";

const OrgListItem: React.FC<{ org: Org; setting?: boolean }> = ({
  org,
  setting = false,
}) => {
  const uri = setting ? `/dashboard/org-manage/${org.id}` : `/orgs/${org.id}`;

  return (
    <Card className="mb-1 shadow-sm list-item">
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
              <h4 className="fs-6 mb-0">{org.name}</h4>
            </Link>
          </Col>
          <Col xs={2} className="text-center">
            {org.pivot && (
              <Badge bg={getBadgeVariant2(org.pivot.role)}>
                {org.pivot.role}
              </Badge>
            )}
          </Col>

          <Col xs={2}>
            <div className="text-muted fs-7">
              {new Date(org.created_at).toLocaleDateString()}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrgListItem;
