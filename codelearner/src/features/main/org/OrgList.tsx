import { useEffect, useState } from "react";
import { getOrgsList } from "../../../service/api/org-manage/getOrgsList";
import { Org } from "../../../types/org/org.type";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const OrgList = () => {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await getOrgsList();
        setOrgs(response.org);
        // console.log(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch organizations");
        setLoading(false);
      }
    };

    fetchOrgs();
  }, []);

  if (loading)
    return (
      <Spinner
        animation="border"
        role="status"
        className="d-block mx-auto my-5"
      />
    );
  if (error)
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    );

  return (
    <Container className="py-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {orgs.map((organizations) => (
          <Col key={organizations.id}>
            <Card className="h-100 shadow-sm hover-shadow">
              {organizations.logo && (
                <Card.Img
                  variant="top"
                  src={organizations.logo}
                  alt={`${organizations.org_name} logo`}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    padding: "1rem",
                  }}
                />
              )}
              <Card.Body>
                <Card.Title>{organizations.org_name}</Card.Title>
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
        ))}
      </Row>
    </Container>
  );
};

export default OrgList;
