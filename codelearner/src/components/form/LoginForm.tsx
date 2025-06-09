import { Form, Button } from "react-bootstrap";
import React from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface LoginProps {
  onSwitchToSignUp: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ onSwitchToSignUp }) => {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = login(email, password);

      toast.promise(response, {
        pending: "Logging in...",
        success: {
          render() {
            return `Welcome back!`;
          },
        },
        error: `${error || "Login failed. Please try again."}`,
      });
      await response;
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <h3 className="text-dark text-center">LOGIN</h3>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
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
            <a
              href="javascript:void(0)"
              onClick={onSwitchToSignUp}
              className="text-muted"
            >
              Don't have an account?
            </a>
          </div>
        </Form.Group>
      </Form>
    </>
  );
};

export default LoginForm;
