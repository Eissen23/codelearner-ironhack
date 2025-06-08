import React from "react";
import LayoutHome from "../layout/LayoutHome";
import DashBoardLeft from "../components/dash-board/DashBoardLeft";
import { useAuth } from "../context/auth/AuthContext";
import { Outlet } from "react-router";
import "../assets/style/DashBoard.css";

const orgHead = [
  {
    path: "/dashboard/org-manage",
    label: "Manage Organization",
    icon: "bi bi-house-gear",
  },
  {
    path: "/dashboard/course",
    label: "Manage Course",
    icon: "bi bi-book-half",
  },
  {
    path: "/dashboard/problemset",
    label: "Manage Problem Set",
    icon: "bi bi-building-gear",
  },
];

const moderator = [
  {
    path: "/dashboard/mod/problemset",
    label: "Manage Problem Sets",
    icon: "bi bi-file-post",
  },
  {
    path: "/dashboard/mod/course",
    label: "Manage Course",
    icon: "bi bi-pen",
  },
];

const DashBoard: React.FC = () => {
  const { token } = useAuth();

  return (
    <LayoutHome noGutter>
      <div className="dashboard_layout">
        <div className="dashboard_nav border-end border-1">
          <DashBoardLeft title="User's section" />
          <hr />
          <DashBoardLeft
            title="Organization's head section"
            menuItems={orgHead}
          />
          <hr />
          <DashBoardLeft title="Moderator's section" menuItems={moderator} />
        </div>
        <div className="dashboard_content">
          <Outlet context={token} />
        </div>
      </div>
    </LayoutHome>
  );
};

export default DashBoard;
