import { useEffect, useState } from "react";
import { getCourseInfo } from "../../../service/api/cours-manage/getCourseInfo";
import { Course } from "../../../types/org/course.type";
import { Org } from "../../../types/org/org.type";

export const useCourseInfo = (
  courseId: string | undefined,
  is_belong?: boolean
) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [belong, setBelong] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        setLoading(true);
        const { data, belong_to } = await getCourseInfo(
          courseId ? courseId : "",
          is_belong
        );
        setCourse(data);
        setBelong(belong_to);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch course information"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourseInfo();
  }, []);

  return { course, belong, loading, error };
};
