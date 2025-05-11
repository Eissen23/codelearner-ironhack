import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LayoutHome from "../layout/LayoutHome";
import DashBoardLeft from "../components/dash-board/DashBoardLeft";
import { getDetailInfo } from "../service/api/user-manage/getDetailInfo";
import { useAuth } from "../context/auth/AuthContext";
import { Outlet, useLoaderData } from "react-router";
import { UserDetail } from "../types/user.type";

const DashBoard: React.FC = () => {
  const [userDetail, setUserDetail] = useState<UserDetail | undefined>(
    undefined
  );
  const requestInProgress = useRef(false);

  const { token } = useAuth();
  const loaderData = useLoaderData() as UserDetail;

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

    if (loaderData) {
      setUserDetail(loaderData);
    } else {
      fetchUserDetail();
    }
  }, [token, loaderData]);

  return (
    <LayoutHome>
      <Container fluid className="my-5">
        <Row>
          <Col md={3}>
            <DashBoardLeft />
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
