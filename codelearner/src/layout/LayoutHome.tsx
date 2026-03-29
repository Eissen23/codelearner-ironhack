import React, { ReactNode } from "react";
import HeadNav from "../components/HeadNav";
import Footer from "../components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/style/Layout.css";
interface LayoutHomeProps {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  noGutter?: boolean;
  className?: string;
  
}

const LayoutHome: React.FC<LayoutHomeProps> = ({
  children,
  header,
  footer,
  noGutter,
  className,
}) => {
  return (
    <>
      <header>{header || <HeadNav></HeadNav>}</header>
      <main className={className}>
        {!noGutter ? (
          <Container>
            <Row>
              <Col md={12} lg={12}>
                {children}
              </Col>
            </Row>
          </Container>
        ) : (
          <Row className="g-0">
            <Col md={12} lg={12}>
              {children}
            </Col>
          </Row>
        )}
      </main>
      <footer className="text-white bg-dark z-2 position-relative">
        {footer || <Footer></Footer>}
      </footer>
    </>
  );
};

export default LayoutHome;
