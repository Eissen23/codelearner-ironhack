import "../../assets/style/Login.css";
import { Alert, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";

interface SignUpProps {
  onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { register } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const account_name = formData.get("account-name") as string;
    const password_confirmation = formData.get("confirm-password") as string;

    try {
      await register(account_name, name, email, password, password_confirmation);
      setSuccess('Sign up successful');
      // Redirect or show success message
    } catch (error) {
      setSuccess(null);
      setError('Sign up failed. Please check your credentials.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert dismissible variant="danger">{error}</Alert>}
      {success && <Alert dismissible variant="success">Sign up successful</Alert>}
      <h3 className="text-dark text-center">SIGN UP</h3>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Display name</Form.Label>
        <Form.Control
          name="name"
          type="name"
          placeholder="Enter name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="accountName">
        <Form.Label>Display account name</Form.Label>
        <Form.Control
          name="account-name"
          type="name"
          placeholder="Enter name"
        />
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
          <a href="javascript:void(0)" onClick={onSwitchToLogin} className="text-muted">
            Have an account?
          </a>
        </div>
      </Form.Group>
    </Form>
  );
};

export default SignUpForm;
