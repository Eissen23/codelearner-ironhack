import { Nav } from "react-bootstrap";
import { NavLink } from "../../../types/feature-data/nav.type";

const DefaultNavItems: NavLink[] = [
  {
    label: "Overview",
    href: "/",
    key: "overview",
  },
  {
    label: "Profile",
    href: "/about",
    key: "profile",
  },
  {
    label: "Settings",
    href: "/settings",
    key: "settings",
  },
];

const VerticalNav = ({
  navItems = DefaultNavItems,
  activeTab,
  onSelect,
}: {
  navItems: NavLink[];
  activeTab: string | null;
  onSelect: (selectedKey: string | null) => void;
}) => {
  return (
    <Nav
      variant="pill"
      className="flex-column"
      activeKey={activeTab ?? undefined}
      onSelect={onSelect}
    >
      {navItems.map((item) => (
        <Nav.Item className="me-auto">
          <Nav.Link
            eventKey={item.key}
            key={item.label}
            href={item.href ?? "javascript:void(0)"}
          >
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default VerticalNav;
