import { useEffect, useState } from "react";
import { getCourseInfo } from "../../../service/api/cours-manage/getCourseInfo";
import { Course } from "../../../types/org/course.type";
import { Org } from "../../../types/org/org.type";
import { checkEnroll } from "../../../service/user-service/enroll/checkEnroll";

type useOrgInfoCred = {
  courseId?: string;
  token?: string;
  is_belong?: boolean;
  enrollCheck?: boolean;
  role_check?: boolean;
};

export const useCourseInfo = ({
  courseId = "",
  token,
  is_belong = false,
  enrollCheck = false,
}: useOrgInfoCred) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [belong, setBelong] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState<boolean>(false);
  const [enroll, setEnroll] = useState<boolean>();

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

  useEffect(() => {
    if (!enrollCheck && !token) return;

    const fetchUserEnroll = async () => {
      try {
        setEnrollLoading(true);
        const { enrolled } = await checkEnroll(courseId, token!);
        setEnroll(enrolled);
      } catch (error) {
        console.log("fetchUserEnroll", error);
      } finally {
        setEnrollLoading(false);
      }
    };

    fetchUserEnroll();
  }, [enrollCheck]);

  return {
    course,
    belong,
    loading: loading || enrollLoading,
    enroll,
    setEnroll,
  };
};
