import React, { useEffect } from "react";
import { getUserOrg } from "../../../service/api/user-manage/getUserOrg";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Org } from "../../../types/org/org.type";

const UserOrg: React.FC<{ token: string }> = ({ token }) => {
  const [orgs, setOrgs] = React.useState<Org[]>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        setLoading(true);
        const data = await getUserOrg(token);
        setOrgs(data);
      } catch (err) {
        console.log("error while getting user's org");
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, [token]);

  if (loading) {
    return (
      <Spinner
        animation="border"
        role="status"
        className="d-block mx-auto my-5"
      />
    );
  }

  if (!orgs) {
    return (
      <Alert variant="danger" className="m-3">
        No data ....
      </Alert>
    );
  }

  return (
    <div className="user_org">
      <Container className="py-4">
        <Row xs={1} md={2} lg={3} className="g-4">
          {orgs.map((organizations) => (
            <Col key={`org-${organizations.id}`}>
              <Card className="h-100 shadow-sm hover-shadow">
                {organizations.logo && (
                  <Card.Img
                    variant="top"
                    src={organizations.logo}
                    alt={`${organizations.name} logo`}
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
                      href={`/orgs/${organizations.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {organizations.name}
                    </a>
                  </Card.Title>
                  <Card.Text>{organizations.description}</Card.Text>
                  <div className="text-muted">
                    <p className="mb-1">
                      Contact: {organizations.contact_email}
                    </p>
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
    </div>
  );
};

export default UserOrg;
