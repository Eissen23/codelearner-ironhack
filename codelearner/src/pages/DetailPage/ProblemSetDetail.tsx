import { Alert, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import LayoutHome from "../../layout/LayoutHome";
import ProblemSetInfo from "../../components/problemset/ProblemSetInfo";
import ProblemSetProblems from "../../components/problems/ProblemSetProblems";
import Filter from "../../features/main/filter/Filter";

const ProblemSetDetail = () => {
  const { problem_set } = useParams<{ problem_set: string }>();
  if (problem_set === undefined) {
    return <Alert variant="info">No data</Alert>;
  }

  return (
    <LayoutHome>
      <div className="problemset_detail my-3">
        <Row>
          <Col xs={12} md={4}>
            <ProblemSetInfo problem_set_id={problem_set} />
          </Col>
          <Col xs={12} md={8}>
            <Filter problem_only />
            <ProblemSetProblems problemSetId={problem_set} />
          </Col>
        </Row>
      </div>
    </LayoutHome>
  );
};

export default ProblemSetDetail;
