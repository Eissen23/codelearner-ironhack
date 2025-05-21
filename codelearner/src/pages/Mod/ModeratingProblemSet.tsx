import { Badge } from "react-bootstrap";
import OrgProblemSetMod from "../../components/problemset/OrgProblemSetMod";

const ModeratingProblemSet = () => {
  return (
    <section>
      <h2 className="h4 mb-3">
        Your moderating problem sets <Badge bg="primary">Moderator</Badge>
      </h2>
      <OrgProblemSetMod />
    </section>
  );
};

export default ModeratingProblemSet;
