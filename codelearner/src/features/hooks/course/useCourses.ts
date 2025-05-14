import React from "react";
import { getCourses } from "../../../service/api/cours-manage/getCourses";
import { Course } from "../../../types/org/course.type";

export const useCourses = (org_id?: string) => {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { courses_page } = await getCourses(org_id);
        setCourses(courses_page.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [org_id]);

  return { courses, loading };
};
