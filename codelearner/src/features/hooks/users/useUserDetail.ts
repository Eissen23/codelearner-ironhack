import { useState, useEffect, useRef } from "react";
import { getDetailInfo } from "../../../service/api/user-manage/getDetailInfo";
import { UserDetail } from "../../../types/user.type";

export const useUserDetail = (token: string | null) => {
  const [userDetail, setUserDetail] = useState<UserDetail | undefined>(
    undefined
  );
  const requestInProgress = useRef(false);

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (token && !requestInProgress.current) {
        requestInProgress.current = true;
        try {
          const data = await getDetailInfo(token);
          setUserDetail(data);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        } finally {
          requestInProgress.current = false;
        }
      }
    };
    fetchUserDetail();
  }, [token]);

  return userDetail;
};
