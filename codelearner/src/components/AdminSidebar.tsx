import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../assets/style/AdminSidebar.css";

const AdminSidebar: React.FC = () => {
  return (
    <div className="admin-sidebar d-flex flex-column bg-light h-100">
      <Nav className="flex-column p-3">
        <Nav.Item>
          <NavLink to="/admin/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/admin/users" className="nav-link">
            Users
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/admin/settings" className="nav-link">
            Settings
          </NavLink>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
