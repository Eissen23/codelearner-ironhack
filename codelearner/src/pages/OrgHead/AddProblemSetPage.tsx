import { useParams } from "react-router";
import { useOrgDetail } from "../../features/hooks/orgs/useOrgDetail";
import { Spinner } from "react-bootstrap";
import BackBtn from "../../features/mislancenous/BackBtn";
import AddProblemSet from "../../components/dash-board/element/AddProblemSet";

const AddProblemSetPage = () => {
  const { org_id } = useParams();
  const { data, loading } = useOrgDetail(org_id || "");

  if (loading) {
    return (
      <div className="w-100 d-flex align-items-center h-100 justify-content-center">
        <Spinner animation="border"></Spinner>;
      </div>
    );
  }

  if (!data) {
    return <div>No org found</div>;
  }

  return (
    <div className="create_course">
      <BackBtn></BackBtn>
      <AddProblemSet orgs={data} />
    </div>
  );
};

export default AddProblemSetPage;
