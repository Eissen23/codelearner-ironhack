import React from "react";
import { Col, Row } from "react-bootstrap";
import CourseCardItem from "./element/CourseCardItem";
import { useCourses } from "../../features/hooks/course/useCourses";
import { useParams } from "react-router";

const CourseInOrg: React.FC<{ isMod?: boolean }> = ({ isMod }) => {
  const { org_id } = useParams();
  const { courses, loading } = useCourses(org_id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="moderator-org">
      <h4 className="mb-3">Course In Org</h4>
      {courses.length ? (
        <Row>
          {courses.map((course) => (
            <Col key={`crs-${course.id}`} md={4} xs={12} className="mb-3">
              <CourseCardItem course={course} setting={isMod} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-info">No course available</div>
      )}
    </div>
  );
};

export default CourseInOrg;
