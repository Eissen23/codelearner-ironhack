import "../style/Login.css";
import { Form, Button } from "react-bootstrap";
import React from "react";

function login(formData: any) {
  console.log(formData);
}
interface LoginProps {
  onSwitchToSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignUp }) => {
  return (
    <Form action={login}>
      <h3 className="text-dark text-center">LOGIN</h3>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="d-flex justify-content-center mb-3">
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form.Group>
      <Form.Group className="mb-3 d-flex justify-content-between">
        <div className="forget-password">
          <a href="#" className="text-muted">
            Forget password
          </a>
        </div>
        <div className="sign-up">
          <a href="#" onClick={onSwitchToSignUp} className="text-muted">
            Don't have an account?
          </a>
        </div>
      </Form.Group>
    </Form>
  );
};

export default Login;
