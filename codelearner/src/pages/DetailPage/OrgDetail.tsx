import { useParams } from "react-router";
import OrgInfo from "../../components/org/org/OrgInfo";
import LayoutHome from "../../layout/LayoutHome";
import { Row, Col } from "react-bootstrap";
import CourseInOrg from "../../components/courses/CourseInOrg";
import ProblemSetInOrg from "../../components/org/org/ProblemSetInOrg";

const OrgDetail = () => {
  const { org_id } = useParams();

  return (
    <LayoutHome>
      <h2 className="my-3 text-center">Properties of Organization</h2>
      <Row className="mb-5">
        <Col xs={12} md={3}>
          <div className="">{org_id && <OrgInfo id={org_id} />}</div>
        </Col>
        <Col xs={12} md={9}>
          <section id="course" className="mb-3 bg-light rounded-3 p-3">
            <CourseInOrg />
          </section>
          <section id="problem-set" className="mb-3 bg-light rounded-3 p-3">
            <ProblemSetInOrg org_id={org_id ? org_id : ""} />
          </section>
        </Col>
      </Row>
    </LayoutHome>
  );
};
export default OrgDetail;
