import { useEffect, useState } from "react";
import { getCourseInfo } from "../../../service/api/cours-manage/getCourseInfo";
import { Course } from "../../../types/org/course.type";
import { Org } from "../../../types/org/org.type";

export const useCourseInfo = (
  courseId: string = "",
  is_belong: boolean = false,
  checkOwner: boolean = false
) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [belong, setBelong] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState<boolean>(false);
  const [role_owner, setRole] = useState<string>("UNAUTHORIZE");

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        setLoading(true);
        const { data, belong_to } = await getCourseInfo(courseId, is_belong);
        setCourse(data);
        setBelong(belong_to);
      } catch (err) {
        console.log("error fetch course info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseInfo();
  }, [courseId]);

  return { course, belong, loading: loading || roleLoading, role: role_owner };
};
