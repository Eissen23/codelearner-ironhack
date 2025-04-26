import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LayoutMain from '../layout/LayoutMain';
import DashBoardLeft from '../features/main/dash-board/DashBoardLeft';
import DashBoardRight from '../features/main/dash-board/DashBoardRight';

const DashBoard: React.FC = () => {
  return (
    <LayoutMain>
      <Container fluid>
        <Row className="g-4">
          <Col md={3}>
            <DashBoardLeft />
          </Col>
          <Col md={9}>
            <DashBoardRight />
          </Col>
        </Row>
      </Container>
    </LayoutMain>
  );
};

export default DashBoard;
