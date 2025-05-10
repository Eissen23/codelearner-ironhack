import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface MenuItem {
  path: string;
  label: string;
  icon?: string;
}

interface DashBoardLeftProps {
  menuItems?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  {
    path: "/dashboard",
    label: "Overview",
    icon: "bi bi-house",
  },
  {
    path: "/dashboard/profile",
    label: "Profile",
    icon: "bi bi-person",
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: "bi bi-gear",
  },
];

const DashBoardLeft: React.FC<DashBoardLeftProps> = ({
  menuItems = defaultMenuItems,
}) => {
  return (
    <Nav className="flex-column">
      {menuItems.map((item, index) => (
        <Nav.Item key={index}>
          <Nav.Link
            as={Link}
            to={item.path}
            className="d-flex align-items-center gap-2"
          >
            {item.icon && <i className={item.icon}></i>}
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default DashBoardLeft;
