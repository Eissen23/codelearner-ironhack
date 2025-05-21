import { Badge } from "react-bootstrap";
import OrgModCourse from "../../components/courses/OrgModCourse";

const ModeratingCourse = () => {
  return (
    <section>
      <h2 className="h4 mb-3">
        Your moderating course list <Badge bg="primary">Moderator</Badge>
      </h2>
      <OrgModCourse />
    </section>
  );
};

export default ModeratingCourse;
