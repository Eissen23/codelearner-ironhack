import { Container, Row, Spinner, Alert } from "react-bootstrap";
import { useOrgs } from "../../../features/hooks/orgs/useOrg";
import OrgCardItem from "../element/OrgCardItem";

const OrgList = () => {
  const { orgs, loading, error } = useOrgs();

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
        {orgs.map((org) => (
          <OrgCardItem organizations={org} />
        ))}
      </Row>
    </Container>
  );
};

export default OrgList;
