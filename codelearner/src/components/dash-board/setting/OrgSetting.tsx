import { lazy, Suspense } from "react";

import { useOrgDetail } from "../../../features/hooks/orgs/useOrgDetail";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import OrgInfoItem from "../../org/element/OrgInfoItem";

const CourseInOrg = lazy(() => import("../../courses/CourseInOrg"));
import ProblemSetInOrg from "../../org/org/ProblemSetInOrg";
import CustomSpinner from "../../CustomSpinner";

const OrgSetting = () => {
  const { org_id } = useParams();
  const { loading, data } = useOrgDetail(org_id || "");
  const navigate = useNavigate();

  const handleClick = (to: string) => {
    navigate(`${to}`);
  };

  if (loading)
    return (
      <Spinner
        animation="border"
        role="status"
        className="d-block mx-auto my-5"
      />
    );

  return (
    <div className="course_manage">
      <section className="org_info mb-4 border-1 border-bottom pb-4">
        <h4 className="text-muted">Organization detail</h4>
        {data && <OrgInfoItem org={data} />}
      </section>

      <section className="course_manage mb-4">
        {org_id && (
          <Suspense fallback={CustomSpinner}>
            <CourseInOrg />
          </Suspense>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleClick("add-course")}
        >
          Add Course
        </Button>
      </section>

      <section className="problemset_manage">
        {org_id && <ProblemSetInOrg org_id={org_id} />}
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleClick("add-problem-set")}
        >
          Add Problemset
        </Button>
      </section>
    </div>
  );
};

export default OrgSetting;
