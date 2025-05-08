import { Alert, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import LayoutHome from "../../layout/LayoutHome";
import ProblemSetInfo from "../../components/problemset/ProblemSetInfo";
import ProblemSetProblems from "../../features/main/problems/ProblemSetProblems";
import { getParamFromUrl } from "../../utils/getParamFromUrl";

const ProblemSetDetail = () => {
  const { problem_set } = useParams<{ problem_set: string }>();
  const page = getParamFromUrl("page");

  if (problem_set === undefined) {
    return <Alert variant="info">No data</Alert>;
  }

  return (
    <LayoutHome>
      <div className="problemset_detail">
        <Row>
          <Col xs={12} md={4}>
            <ProblemSetInfo problem_set_id={problem_set} />
          </Col>
          <Col xs={12} md={8}>
            <ProblemSetProblems
              problemSetId={problem_set}
              this_page={page || ""}
            />
          </Col>
        </Row>
      </div>
    </LayoutHome>
  );
};

export default ProblemSetDetail;
