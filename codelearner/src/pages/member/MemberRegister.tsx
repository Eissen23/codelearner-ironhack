import { Col, Container, Row } from "react-bootstrap";
import SignUpForm from "../../components/form/SignUpForm";
import "../../assets/style/Login.css";
import { useNavigate } from "react-router-dom";
import LayoutHome from "../../layout/LayoutHome";
import banner from "/assets/images/Gradient_builder_3.jpeg";
import Logo from "../../features/footer/Logo";
const MemberRegister = () => {
  const navigate = useNavigate();

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  return (
    <LayoutHome noGutter>
      <div
        className="banner-background py-4"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
        }}
      >
        <Container>
          <Row className="mx-3 bg-white rounded-3 shadow">
            <Col lg={7} md={6} sm={12}>
              <section className="h-100 align-items-center d-flex">
                <div
                  className="p-5"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="logo d-flex justify-content-center align-items-center mb-3">
                    <Logo imageUrl="/assets/logo/codelearner.svg" size="sm" />
                  </div>
                  <h1 className="fw-bold text-dark text-center mb-3">
                    Member Register
                  </h1>
                  <p
                    className="fs-5 text-secondary"
                    style={{ textWrap: "balance" }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Beatae odio reiciendis recusandae.
                  </p>
                </div>
              </section>
            </Col>
            <Col lg={5} md={6} sm={12}>
              <div className="p-3" style={{ maxWidth: "400px" }}>
                <SignUpForm onSwitchToLogin={handleSwitchToLogin} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutHome>
  );
};

export default MemberRegister;
