import { Form, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";


interface LoginProps {
  onSwitchToSignUp: () => void;
}


const Login: React.FC<LoginProps> = ({ onSwitchToSignUp }) => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      setSuccess('Login successful');
      // Redirect or show success message
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert dismissible variant="danger">{error}</Alert>}
      {success && <Alert dismissible variant="success">{success}</Alert>}
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
