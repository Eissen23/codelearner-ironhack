import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LayoutHome from "../layout/LayoutHome";
import DashBoardLeft from "../components/dash-board/DashBoardLeft";
import { useAuth } from "../context/auth/AuthContext";
import { Outlet, useLocation } from "react-router";
import { useUserDetail } from "../features/hooks/users/useUserDetail";

const orgHead = [
  {
    path: "/dashboard/head/org-manage",
    label: "Manage Organization",
    icon: "bi bi-house-gear",
  },
  {
    path: "/dashboard/head/course",
    label: "Manage Course",
    icon: "bi bi-book-half",
  },
  {
    path: "/dashboard/head/problemset",
    label: "Manage Problem Set",
    icon: "bi bi-building-gear",
  },
];

const moderator = [
  {
    path: "/dashboard/mod/org-manage",
    label: "Manage Organization",
    icon: "bi bi-house-gear",
  },
  {
    path: "/dashboard/mod/course",
    label: "Manage Course",
    icon: "bi bi-book-half",
  },
];

const DashBoard: React.FC = () => {
  // const location = useLocation();
  // const routesNeedingData = ["/setting", "/dashboard", "/settings"];
  // const noNeedData = routesNeedingData.some((route) =>
  //   location.pathname.startsWith(route)
  // );

  const { token } = useAuth();
  const userDetail = useUserDetail(token);

  return (
    <LayoutHome>
      <Container fluid className="my-5">
        <Row>
          <Col md={3} className="border-end border-1 ">
            <DashBoardLeft title="User's section" />
            <div className="py-3 text-secondary">____________________</div>
            <DashBoardLeft
              title="Organization's head section"
              menuItems={orgHead}
            />
            <div className="py-3 text-secondary">____________________</div>
            <DashBoardLeft title="Moderator's section" menuItems={moderator} />
          </Col>
          <Col md={9}>
            <Outlet context={userDetail} />
          </Col>
        </Row>
      </Container>
    </LayoutHome>
  );
};

export default DashBoard;
