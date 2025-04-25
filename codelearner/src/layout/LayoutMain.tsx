import React, { ReactNode } from "react";
import HeadNav from "../components/HeadNav";
import { Col, Container, Row } from "react-bootstrap";

interface LayoutHomeProps {
  children: ReactNode;
}

const LayoutHome: React.FC<LayoutHomeProps> = ({ children }) => {
  return (
    <div>
      <header>
        <HeadNav></HeadNav>
      </header>
      <main>{children}</main>
      <footer>
        <Container>
          <Row>
            <Col md={12} lg={12}></Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LayoutHome;
