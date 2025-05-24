import React from "react";
import { Course } from "../../../types/org/course.type";
import { getUserEnroll } from "../../../service/api/user-manage/getUserEnroll";

export const useEnroll = (token?: string) => {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const enrolleds = await getUserEnroll(token!);
        setCourses(enrolleds);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading };
};
