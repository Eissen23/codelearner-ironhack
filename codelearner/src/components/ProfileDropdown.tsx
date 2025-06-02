import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import Logout from "./auth/Logout";

const ProfileDropdown: React.FC = () => {
  // handle logout
  return (
    <Dropdown className="profile-dropdown">
      <DropdownButton
        variant="dark"
        align="end"
        id="dropdown-basic"
        className="text-white rounded-pill"
        title={<FaUserCircle />}
      >
        <Dropdown.Item href="/dashboard/profile">View Profile</Dropdown.Item>
        <Dropdown.Item href="/dashboard/settings">Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <Logout />
        </Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
};

export default ProfileDropdown;
