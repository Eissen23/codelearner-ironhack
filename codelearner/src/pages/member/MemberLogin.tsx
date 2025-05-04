import { Container } from "react-bootstrap";
import LoginForm from "../../components/form/LoginForm";
import "../../assets/style/Login.css";
import { useNavigate } from "react-router-dom";
import LayoutHome from "../../layout/LayoutHome";
const MemberLogin = () => {
  const navigate = useNavigate();
  
  const handleSwitchToSignUp = () => {
    // This is a placeholder since we'll handle signup differently in the member route
    navigate("/signup");
  };

  return (
    <LayoutHome>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <LoginForm onSwitchToSignUp={handleSwitchToSignUp} />
      </div>
    </Container>
    </LayoutHome>
  );
};

export default MemberLogin;
