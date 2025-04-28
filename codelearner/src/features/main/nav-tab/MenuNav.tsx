import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

interface MenuItem {
  label: string;
  link: string;
}

interface MenuNavProps {
  items: MenuItem[];
}

const MenuNav = ({ items }: MenuNavProps) => {
  return (
    <Stack direction="horizontal" gap={3} className="py-2">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="text-white rounded-pill btn btn-dark"
        >
          {item.label}
        </Link>
      ))}
    </Stack>
  );
};

export default MenuNav;
