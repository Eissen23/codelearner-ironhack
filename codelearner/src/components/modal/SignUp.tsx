import "../../assets/style/Login.css";
import { Button, Form } from "react-bootstrap";
import React from "react";

function signup(formData: any) {
  console.log(formData);
}
interface SignUpProps {
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
  return (
    <Form action={signup}>
      <h3 className="text-dark text-center">SIGN UP</h3>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Display name</Form.Label>
        <Form.Control name="name" type="name" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          name="confirm-password"
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Group>
      <Form.Group className="d-flex justify-content-center mb-3">
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form.Group>
      <Form.Group className="mb-3 d-flex justify-content-between">
        <div className="forget-password">
          <a href="#" className="text-muted">
            Forget password
          </a>
        </div>
        <div className="sign-up">
          <a href="#" onClick={onSwitchToLogin} className="text-muted">
            Have an account?
          </a>
        </div>
      </Form.Group>
    </Form>
  );
};

export default SignUp;
