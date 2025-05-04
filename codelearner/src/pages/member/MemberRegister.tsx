import { Col, Container, Row } from "react-bootstrap";
import SignUpForm from "../../components/form/SignUpForm";
import "../../assets/style/Login.css";
import { useNavigate } from "react-router-dom";
import LayoutHome from "../../layout/LayoutHome";
import banner from "/assets/images/Gradient_builder_3.jpeg";


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
                <section className="h-100">
                    <div className="h-100 d-flex flex-column p-5 justify-content-center" style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        <h1 className="text-white">Member Register</h1>
                        <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                    </div>
                </section>
            </Col>
            <Col lg={4} md={6} sm={12}>
                <div className="w-100 m-3" style={{ maxWidth: "400px" }}>
                    <SignUpForm onSwitchToLogin={handleSwitchToLogin} />
                </div>
            </Col>
        </Row>
      </Container>
    </LayoutHome>
  );
};

export default MemberRegister;
