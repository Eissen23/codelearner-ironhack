import React from "react";
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

interface BackBtnProps {
  to?: string;
  className?: string;
}

const BackBtn: React.FC<BackBtnProps> = ({ to = -1, className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof to === "string") {
      navigate(to);
    } else {
      navigate(to);
    }
  };

  return (
    <Button
      variant="link"
      className={`d-flex align-items-center gap-2 ${className}`}
      onClick={handleBack}
    >
      <i className="bi bi-arrow-left me-2"></i>
      Back
    </Button>
  );
};

export default BackBtn;
