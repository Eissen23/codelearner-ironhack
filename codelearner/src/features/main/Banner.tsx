import React, { ReactNode } from "react";

// Define the props interface for the Banner component
interface BannerProps {
  title: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  icon?: ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
}

/**
 * Banner Component
 *
 * A flexible Bootstrap-styled banner component that can be used to display messages,
 * notifications, or promotional content.
 *
 * @param props BannerProps - Configuration options for the banner
 */
const Banner: React.FC<BannerProps> = ({
  title,
  variant = "primary",
  icon,
  dismissible = false,
  onClose,
  children,
}) => {
  return (
    <div
      className={`alert alert-${variant} ${
        dismissible ? "alert-dismissible fade show" : ""
      }`}
      role="alert"
    >
      <div className="d-flex align-items-center justify-content-center">
        {icon && <div className="me-2">{icon}</div>}
        <div>
          <h3 className="text-center">{title}</h3>
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>

      {dismissible && onClose && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}
    </div>
  );
};

export default Banner;
