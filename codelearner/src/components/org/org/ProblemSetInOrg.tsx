import React from "react";
import { getProblemSetOrg } from "../../../service/api/problem-set-manage/getProblemSetOrg";
import { ProblemSet } from "../../../types/org/problem_set.type";
import { Col, Card, Row } from "react-bootstrap";

const ProblemSetInOrg: React.FC<{ org_id: string }> = ({ org_id }) => {
  const [problemSets, setProblemSets] = React.useState<ProblemSet[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProblemSets = async () => {
      try {
        const { problem_sets } = await getProblemSetOrg(org_id);
        setProblemSets(problem_sets.data);
      } catch (error) {
        console.error("Error fetching problem sets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemSets();
  }, [org_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(problemSets);
  return (
    <div className="moderator-org">
      <h4>Problem Sets In Organization</h4>
      {problemSets.length ? (
        <Row>
          {problemSets.map((problemSet) => (
            <Col key={problemSet.id} md={4} xs={12} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>
                    <a
                      href={`/problem-sets/${problemSet.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {problemSet.name}
                    </a>
                  </Card.Title>
                  <Card.Text>{problemSet.short_description}</Card.Text>
                  <div className="text-muted small">
                    <p className="mb-1">
                      Created:{" "}
                      {new Date(problemSet.created_at).toLocaleDateString()}
                    </p>
                    <p className="mb-0">
                      Expires:{" "}
                      {new Date(problemSet.expired_at).toLocaleDateString()}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-info">No problem set available</div>
      )}
    </div>
  );
};

export default ProblemSetInOrg;
