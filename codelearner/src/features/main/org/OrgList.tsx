import { useEffect, useState } from "react";
import { getOrgsList } from "../../../service/api/org-manage/getOrgsList";
import { OrgListResponse } from "../../../types/org/org.type";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const OrgList = () => {
  const [orgs, setOrgs] = useState<OrgListResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const data = await getOrgsList();
        setOrgs(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch organizations");
        setLoading(false);
      }
    };

    fetchOrgs();
  }, []);

  if (loading) return <Spinner animation="border" role="status" className="d-block mx-auto my-5" />;
  if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;

  return (
    <Container className="py-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {orgs.map((orgResponse) => (
          orgResponse.org.map((org) => (
            <Col key={org.id}>
              <Card className="h-100 shadow-sm hover-shadow">
                {org.logo && (
                  <Card.Img 
                    variant="top" 
                    src={org.logo} 
                    alt={`${org.org_name} logo`}
                    style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{org.org_name}</Card.Title>
                  <Card.Text>{org.description}</Card.Text>
                  <div className="text-muted">
                    <p className="mb-1">Contact: {org.contact_email}</p>
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
                </Card.Body>
                <Card.Footer className="text-muted">
                  <small>Last updated: {new Date(org.updated_at).toLocaleDateString()}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ))}
      </Row>
    </Container>
  );
};

export default OrgList;

