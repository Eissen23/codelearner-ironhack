import { useEffect, useState } from "react";
import { getUserInfo } from "../service/api/user-manage/getUserInfo";
import { useAuth } from "../context/auth/AuthContext";
import { FaUserCircle } from "react-icons/fa";

interface CachedUserInfo {
  account_name: string;
  full_name: string;
  image_avatar: string;
}

const ProfileMini = () => {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState<CachedUserInfo>(() => {
    const cached = localStorage.getItem("userProfileMini");
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) return;

      try {
        const response = await getUserInfo({ token });
        // Only store necessary fields
        const minimalUserInfo: CachedUserInfo = {
          account_name: response.account_name,
          full_name: response.full_name,
          image_avatar: response.image_avatar,
        };

        setUserInfo(minimalUserInfo);
        localStorage.setItem(
          "userProfileMini",
          JSON.stringify(minimalUserInfo)
        );
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [token]);

  if (!userInfo) {
    return <FaUserCircle style={{ marginBottom: "25%" }} />;
  }

  return (
    <div className="profile-mini d-flex align-items-center">
      <div className="profile-name me-1">
        <p className="mb-0" style={{ fontSize: "0.875rem" }}>
          {userInfo.account_name}
        </p>
        <p className="text-bg-primary mb-0" style={{ fontSize: "0.675rem" }}>
          {userInfo.full_name}
        </p>
      </div>

      <div className="profile-image ms-1">
        {userInfo.image_avatar ? (
          <img
            src={userInfo.image_avatar}
            alt={userInfo.account_name}
            className="rounded-circle"
            style={{ width: "30px", height: "30px" }}
          />
        ) : (
          <FaUserCircle
            className="rounded-circle"
            style={{ width: "30px", height: "30px" }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileMini;
