import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LayoutHome from "../layout/LayoutHome";
import DashBoardLeft from "../components/dash-board/DashBoardLeft";
import { useAuth } from "../context/auth/AuthContext";
import { Outlet, useLoaderData } from "react-router";
import { useUserDetail } from "../features/hooks/users/useUserDetail";

const settings = [
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
];

const DashBoard: React.FC = () => {
  const { token } = useAuth();
  const userDetail = useUserDetail(token);

  return (
    <LayoutHome>
      <Container fluid className="my-5">
        <Row>
          <Col md={3}>
            <DashBoardLeft title="User's section" />
            <div className="py-3">--------------</div>

            <DashBoardLeft title="Moderator's section" menuItems={settings} />
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
