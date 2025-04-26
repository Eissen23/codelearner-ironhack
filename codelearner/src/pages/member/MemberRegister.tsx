import { Col, Container, Row } from "react-bootstrap";
import SignUpForm from "../../components/form/SignUpForm";
import "../../assets/style/Login.css";
import { useNavigate } from "react-router-dom";
import LayoutHome from "../../layout/LayoutMain";
import Banner from "../../features/main/Banner";

const MemberRegister = () => {
  const navigate = useNavigate();

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <LayoutHome>
      <Container
      >
        <Row>
            <Col lg={8} md={6} sm={12}>
                <Banner className="h-100" title="Member Register"  >
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                    </p>
                </Banner>
            </Col>
            <Col lg={4} md={6} sm={12}>
                <div className="w-100 p-5" style={{ maxWidth: "400px" }}>
                    <SignUpForm onSwitchToLogin={handleSwitchToLogin} />
                </div>
            </Col>
        </Row>
      </Container>
    </LayoutHome>
  );
};

export default MemberRegister;
