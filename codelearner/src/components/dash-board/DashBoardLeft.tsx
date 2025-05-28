import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  path: string;
  label: string;
  icon?: string;
}

interface DashBoardLeftProps {
  title?: string;
  menuItems?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  {
    path: "/dashboard/profile",
    label: "Overview",
    icon: "bi bi-house",
  },
  {
    path: "/dashboard/your-course",
    label: "Your course",
    icon: "bi bi-journal",
  },
  {
    path: "/dashboard/your-submission",
    label: "Your submission",
    icon: "bi bi-file-code-fill",
  },
  {
    path: "/dashboard/your-solution",
    label: "Your solution",
    icon: "bi bi-file-code-fill",
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: "bi bi-gear",
  },
];

const DashBoardLeft: React.FC<DashBoardLeftProps> = ({
  title,
  menuItems = defaultMenuItems,
}) => {
  const location = useLocation();
  const isActive = (path: string) => {
    // Check if current path starts with nav item path
    return location.pathname.startsWith(path);
  };
  return (
    <>
      <h3 className="fs-6 text-secondary">{title}</h3>
      <Nav className="flex-column">
        {menuItems.map((item, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              as={Link}
              to={`${item.path}`}
              className={`d-flex align-items-center gap-2 ${
                isActive(item.path) ? "active text-primary" : "text-dark"
              }`}
            >
              {item.icon && <i className={item.icon}></i>}
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </>
  );
};

export default DashBoardLeft;
