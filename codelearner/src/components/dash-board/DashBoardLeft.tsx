import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    path: "/dashboard",
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
    path: "/dashboard/settings",
    label: "Settings",
    icon: "bi bi-gear",
  },
];

const DashBoardLeft: React.FC<DashBoardLeftProps> = ({
  title,
  menuItems = defaultMenuItems,
}) => {
  return (
    <>
      <h3 className="fs-6 text-secondary">{title}</h3>
      <Nav className="flex-column">
        {menuItems.map((item, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              as={Link}
              to={`${item.path}`}
              className="d-flex align-items-center gap-2 text-dark nav-pills"
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
