import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
    <LayoutHome>
      <Container fluid>
        <Row>
          <Col md={3} className="border-end border-1">
            <DashBoardLeft title="User's section" />
            <hr />
            <DashBoardLeft
              title="Organization's head section"
              menuItems={orgHead}
            />
            <hr />
            <DashBoardLeft title="Moderator's section" menuItems={moderator} />
          </Col>
          <Col md={9}>
            <Outlet context={token} />
          </Col>
        </Row>
      </Container>
    </LayoutHome>
  );
};

export default DashBoard;
