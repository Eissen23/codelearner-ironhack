import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LayoutMain from "../layout/LayoutMain";
import DashBoardLeft from "../features/main/dash-board/DashBoardLeft";
import DashBoardRight from "../features/main/dash-board/DashBoardRight";
import { getUserInfo } from "../service/api/user-manage/getUserInfo";
import { useAuth } from "../context/auth/AuthContext";
import { User } from "../types/auth.types";

const DashBoard: React.FC = () => {
	const { token } = useAuth();

  const [userDetail, setUserDetail] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (token) {
      getUserInfo({ token }).then(setUserDetail);
    }
  }, [token]);
  
	return (
    <LayoutMain>
      <Container fluid className="my-5">
        <Row>
          <Col md={3}>
            <DashBoardLeft />
          </Col>
          <Col md={9}>
            <DashBoardRight userInfo={userDetail} />
          </Col>
        </Row>
      </Container>
    </LayoutMain>
  );
};

export default DashBoard;
