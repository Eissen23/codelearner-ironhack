import React, { ReactNode } from "react";
import HeadNav from "../components/HeadNav";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";




interface LayoutHomeProps {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

const LayoutHome: React.FC<LayoutHomeProps> = ({ children, header, footer }) => {
  return (
    <div>
      <header>
        {header || <HeadNav></HeadNav>}
      </header>
      <main>
        <Container>
          <Row>
            <Col md={12} lg={12}>
              {children}
            </Col>
          </Row>
        </Container>
      </main>
      <footer className="text-white bg-dark">
          <Row>
            <Col md={{span: 10, offset: 1}} lg={{span: 10, offset: 1}} >
              {footer || <Footer></Footer>}
            </Col>
          </Row>
      </footer>
    </div>
  );
};

export default LayoutHome;
