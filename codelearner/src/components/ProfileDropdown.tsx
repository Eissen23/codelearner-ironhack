import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Logout from "./auth/Logout";
import ProfileMini from "./ProfileMini";

const ProfileDropdown: React.FC = () => {
  // handle logout
  return (
    <Dropdown className="profile-dropdown">
      <DropdownButton
        variant="dark"
        align="end"
        id="dropdown-basic"
        className="text-white rounded-pill no-after"
        title={<ProfileMini />}
      >
        <Dropdown.Item href="/dashboard/profile">View Profile</Dropdown.Item>
        <Dropdown.Item href="/dashboard/your-submission">
          Your Submission
        </Dropdown.Item>
        <Dropdown.Item href="/dashboard/your-solution">
          Your Solution
        </Dropdown.Item>
        <Dropdown.Item href="/dashboard/org-manage">
          Your Organization
        </Dropdown.Item>
        <Dropdown.Item href="/dashboard/your-course">
          Your Courses
        </Dropdown.Item>
        {/* <Dropdown.Item href="/dashboard/settings">Settings</Dropdown.Item> */}
        <Dropdown.Divider />
        <Dropdown.Item>
          <Logout />
        </Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
};

export default ProfileDropdown;
