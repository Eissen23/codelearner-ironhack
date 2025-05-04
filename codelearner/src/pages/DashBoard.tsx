import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LayoutHome from "../layout/LayoutHome";
import DashBoardLeft from "../features/main/dash-board/DashBoardLeft";
import DashBoardRight from "../features/main/dash-board/DashBoardRight";
import { getUserInfo } from "../service/api/user-manage/getUserInfo";
import { useAuth } from "../context/auth/AuthContext";
import { User } from "../types/auth.types";

const DashBoard: React.FC = () => {
	const { token } = useAuth();

  const [userDetail, setUserDetail] = useState<User | undefined>(undefined);
  const requestInProgress = useRef(false);

  useEffect(() => {
    if (token && !requestInProgress.current) {
      requestInProgress.current = true;
      getUserInfo({ token })
        .then(setUserDetail)
        .finally(() => {
          requestInProgress.current = false;
        });
    }
  }, [token]);
  
	return (
    <LayoutHome>
      <Container fluid className="my-5">
        <Row>
          <Col md={3}>
            <DashBoardLeft />
          </Col>
          <Col md={9}>
            {!userDetail ? <div>Loading...</div> : <DashBoardRight userInfo={userDetail} />}
          </Col>
        </Row>
      </Container>
    </LayoutHome>
  );
};

export default DashBoard;
