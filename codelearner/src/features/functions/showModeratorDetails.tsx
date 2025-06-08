import { createRoot } from "react-dom/client";
import ModsModalItem from "../../components/dash-board/element/ModsModalItem";
import { UserModerator } from "../../types/user.type";

export const showModeratorDetails = (moderator: UserModerator) => {
  const modalRoot = document.createElement("div");
  document.body.appendChild(modalRoot);

  const root = createRoot(modalRoot);

  const handleClose = () => {
    root.unmount();
    modalRoot.remove();
  };

  root.render(
    <ModsModalItem show={true} onHide={handleClose} moderator={moderator} />
  );
};
