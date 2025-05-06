import { useParams } from "react-router";
import OrgInfo from "../../features/main/org/OrgInfo";
import LayoutHome from "../../layout/LayoutHome";
import { Row, Col } from "react-bootstrap";
import CourseInOrg from "../../features/main/course/CourseInOrg";
import ProblemSetInOrg from "../../features/main/org/ProblemSetInOrg";
import ModeratorOrg from "../../features/main/org/ModeratorOrg";

const OrgDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <LayoutHome>
      <Row>
        <Col xs={12} md={3}>
          <div className="OrgDetail">
            {/* Add more details about the organization here */}
            {id && <OrgInfo id={id} />}
          </div>
        </Col>
        <Col xs={12} md={9}>
          <h2>Properties of Organization</h2>
          <section id="course">
            <CourseInOrg org_id={id ? id : ""} />
          </section>
          <section id="problem-set">
            <ProblemSetInOrg />
          </section>
          <section id="moderator">
            <ModeratorOrg />
          </section>
        </Col>
      </Row>
    </LayoutHome>
  );
};
export default OrgDetail;
