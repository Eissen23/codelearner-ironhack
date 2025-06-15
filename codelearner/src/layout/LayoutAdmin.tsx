import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/style/Layout.css";

interface LayoutAdminProps {
  children: ReactNode;
  noGutter?: boolean;
  className?: string;
}

const LayoutAdmin: React.FC<LayoutAdminProps> = ({
  children,
  noGutter,
  className,
}) => {
  return (
    <>
      <header></header>
      <main className={className}>
        <Container fluid>
          <Row>
            <Col md={3} lg={2} className="bg-light p-0">
              <AdminSidebar />
            </Col>
            <Col md={9} lg={10}>
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
            </Col>
          </Row>
        </Container>
      </main>
      <footer className="text-white bg-dark">{}</footer>
    </>
  );
};

export default LayoutAdmin;
