import { useEffect, useState } from "react";
import { Course } from "../../../types/org/course.type";
import { getCoursesMod } from "../../../service/api/user-manage/moderator/getCoursesMod";

export const useCourseMod = (token: string | null) => {
  const [courses, setCourses] = useState<Course[]>();
  const [isLoading, setIsLoading] = useState(true);

  // refresh

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await getCoursesMod(token || "");
        setCourses(response);
      } catch (err) {
        alert(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, isLoading };
};
