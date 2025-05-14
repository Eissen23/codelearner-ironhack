import { useParams } from "react-router";
import { useOrgDetail } from "../../features/hooks/orgs/useOrgDetail";
import AddCourseOrg from "../../components/dash-board/element/AddCourseOrg";
import { Spinner } from "react-bootstrap";
import BackBtn from "../../features/mislancenous/BackBtn";

const AddCoursePage = () => {
  const { org_id } = useParams();
  const { data, loading } = useOrgDetail(org_id || "");

  if (loading) {
    return <Spinner animation="border"></Spinner>;
  }

  if (!data) {
    return <h2>...Org not found...</h2>;
  }

  return (
    <div className="create_course">
      <BackBtn></BackBtn>
      <AddCourseOrg orgs={data || ""} />
    </div>
  );
};

export default AddCoursePage;
