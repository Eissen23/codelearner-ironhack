import { useParams } from "react-router";
import OrgInfo from "../../components/org/org/OrgInfo";
import LayoutHome from "../../layout/LayoutHome";
import { Row, Col } from "react-bootstrap";
import CourseInOrg from "../../components/courses/CourseInOrg";
import ProblemSetInOrg from "../../components/org/org/ProblemSetInOrg";
import ModeratorOrg from "../../components/org/moderator/ModeratorOrg";

const OrgDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <LayoutHome>
      <Row>
        <Col xs={12} md={3}>
          <div className="mt-5">
            {/* Add more details about the organization here */}
            {id && <OrgInfo id={id} />}
          </div>
        </Col>
        <Col xs={12} md={9}>
          <h2>Properties of Organization</h2>
          <section id="course" className="mb-3 bg-light rounded-3 p-3">
            <CourseInOrg org_id={id ? id : ""} />
          </section>
          <section id="problem-set" className="mb-3 bg-light rounded-3 p-3">
            <ProblemSetInOrg org_id={id ? id : ""} />
          </section>
          <section id="moderator" className="mb-3 bg-light rounded-3 p-3">
            <ModeratorOrg />
          </section>
        </Col>
      </Row>
    </LayoutHome>
  );
};
export default OrgDetail;
