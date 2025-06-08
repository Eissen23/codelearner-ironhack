import React from "react";
import { Modal, Button } from "react-bootstrap";
import { UserModerator } from "../../../types/user.type";

interface ModsModalItemProps {
  show: boolean;
  onHide: () => void;
  moderator: UserModerator;
}

const ModsModalItem: React.FC<ModsModalItemProps> = ({
  show,
  onHide,
  moderator,
}) => {
  return (
    <Modal size="lg" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Moderator Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          {moderator.image_avatar ? (
            <img
              src={moderator.image_avatar}
              alt={`${moderator.full_name}'s avatar`}
              className="img-fluid rounded-circle mb-3"
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <div
              className="placeholder-avatar mb-3"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#ccc",
                borderRadius: "50%",
              }}
            ></div>
          )}
        </div>
        <h5 className="text-center">{moderator.full_name}</h5>
        <p className="text-center text-muted">@{moderator.account_name}</p>
        <p>
          <strong>Email:</strong> {moderator.email}
        </p>
        <p>
          <strong>About:</strong> {moderator.about || "/*No about*/"}
        </p>
        <p>
          <strong>Role:</strong> {moderator.role}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(moderator.created_at).toLocaleDateString()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModsModalItem;
