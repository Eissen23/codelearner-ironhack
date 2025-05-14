import { useEffect, useState } from "react";
import { Course } from "../../../types/org/course.type";
import { getCourseHead } from "../../../service/api/user-manage/getCourseHead";

export const useCourseHead = (token: string | null, refreshKey: number) => {
  const [courses, setCourses] = useState<Course[]>();
  const [isLoading, setIsLoading] = useState(true);

  // refresh

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await getCourseHead(token || "");
        setCourses(response);
      } catch (err) {
        alert(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [refreshKey]);

  return { courses, isLoading };
};
