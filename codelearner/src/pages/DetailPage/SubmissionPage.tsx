import { useParams } from "react-router";
import LayoutHome from "../../layout/LayoutHome";
import { lazy, Suspense } from "react";
import CustomSpinner from "../../components/CustomSpinner";
import { Container } from "react-bootstrap";
import SolutionSub from "../../components/solution/SolutionSub";

const SubmissionInfo = lazy(
  () => import("../../components/submission/element/SubmissionInfo")
);

const SubmissionPage = () => {
  const { user_sub_id } = useParams();

  return (
    <LayoutHome noGutter>
      <h1 className="fs-2 fw-light text-center bg-black text-white">
        Submission: {user_sub_id}
      </h1>
      <Suspense fallback={CustomSpinner}>
        <Container>
          <SubmissionInfo user_sub_id={user_sub_id || ""} />
        </Container>
      </Suspense>
      <Container>
        <SolutionSub />
      </Container>
    </LayoutHome>
  );
};

export default SubmissionPage;
