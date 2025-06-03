import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MenuFooter from "../features/footer/MenuFooter";
import Logo from "../features/footer/Logo";
const addresses = [
  "123 Learning Street",
  "Codelearner City, ST 12345",
  "United States",
];
const menuLinks = [
  { text: "Home", to: "/" },
  { text: "About", to: "/about" },
  { text: "Contact", to: "/contact" },
];
const menuLinks2 = [
  { text: "Condition & Term", to: "/" },
  { text: "Contact", to: "/contact" },
];
const menuLinks3 = [
  { text: "Problems", to: "/problems" },
  { text: "Org", to: "/orgs" },
  { text: "Course", to: "/courses" },
  { text: "Contest", to: "/problem-sets" },
];

const Footer: React.FC = () => {
  return (
    <Container className="py-4 text-white">
      <Row>
        <Col md={4}>
          <Logo size="sm" imageUrl="/assets/logo/codelearner.svg" />
          {addresses.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Col>
        <Col md={2}>
          <MenuFooter title="About us" links={menuLinks} />
        </Col>
        <Col md={2}>
          <MenuFooter title="Policies" links={menuLinks2} />
        </Col>
        <Col md={4} className="text-left">
          <MenuFooter title="Navigate" links={menuLinks3} />
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
