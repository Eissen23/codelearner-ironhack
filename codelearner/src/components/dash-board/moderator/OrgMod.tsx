import React from "react";
import { useParams } from "react-router";
import { useOrgDetail } from "../../../features/hooks/orgs/useOrgDetail";
import { Alert, Spinner } from "react-bootstrap";
import OrgInfoItem from "../../org/element/OrgInfoItem";
import CourseInOrg from "../../courses/CourseInOrg";
import ProblemSetInOrg from "../../org/org/ProblemSetInOrg";

const OrgMod: React.FC = () => {
  const { org_id } = useParams();
  const { data, loading } = useOrgDetail(org_id || "");
  if (loading) {
    return <Spinner animation="border"></Spinner>;
  }

  if (!data) {
    return <Alert variant="info"> No org found </Alert>;
  }

  return (
    <>
      <section className="org_info_mod">
        <OrgInfoItem org={data} onlyRead />
      </section>

      <section className="course_mod">
        <CourseInOrg isMod />
      </section>

      <section className="course_mod">
        <ProblemSetInOrg org_id={org_id || ""} isMod />
      </section>
    </>
  );
};

export default OrgMod;
