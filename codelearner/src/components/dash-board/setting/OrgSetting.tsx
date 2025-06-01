import { lazy, Suspense } from "react";

import { useOrgDetail } from "../../../features/hooks/orgs/useOrgDetail";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate, useOutletContext, useParams } from "react-router";
import OrgInfoItem from "../../org/element/OrgInfoItem";

const CourseInOrg = lazy(() => import("../../courses/CourseInOrg"));
import ProblemSetInOrg from "../../org/org/ProblemSetInOrg";
import CustomSpinner from "../../CustomSpinner";
import ModeratorOrg from "../../org/moderator/ModeratorOrg";

const OrgSetting = () => {
  const navigate = useNavigate();
  const { org_id } = useParams();
  const token = useOutletContext() as string;
  const { loading, data, role_owner } = useOrgDetail(org_id || "", token);
  // const { role } = useLoaderData();

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

  if (role_owner === "UNAUTHORIZE" || role_owner === "Pending") {
    navigate(`/not-authorized`);
  }
  return (
    <div className="course_manage">
      <section className="org_info mb-4 border-1 border-bottom pb-4">
        <h4 className="text-muted">Organization detail</h4>
        {data && <OrgInfoItem org={data} role={role_owner} />}
      </section>

      <section className="course_manage mb-4">
        {org_id && (
          <Suspense fallback={CustomSpinner}>
            <CourseInOrg isMod />
          </Suspense>
        )}
        {role_owner === "OrgHead" && (
          <Button
            variant="primary"
            size="sm"
            className="mt-2"
            onClick={() => handleClick("add-course")}
          >
            Add Course
          </Button>
        )}
      </section>

      <section className="problemset_manage mb-4">
        {org_id && <ProblemSetInOrg org_id={org_id} isMod />}
        {role_owner === "OrgHead" && (
          <Button
            variant="primary"
            size="sm"
            className="mt-2"
            onClick={() => handleClick("add-problem-set")}
          >
            Add Problemset
          </Button>
        )}
      </section>

      <section className="mod_manage">
        {org_id && (
          <ModeratorOrg org_id={org_id} token={token} role={role_owner} />
        )}
      </section>
    </div>
  );
};

export default OrgSetting;
