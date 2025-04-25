import React from 'react';
import { Link } from 'react-router-dom';

interface MenuLink {
  text: string;
  to: string;
}

interface MenuFooterProps {
  title: string;
  links: MenuLink[];
}

const MenuFooter: React.FC<MenuFooterProps> = ({ title, links }) => {
  return (
    <div className="menu-footer">
      <h5 className="menu-title">{title}</h5>
      <ul className="menu-links">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to} className="menu-link">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuFooter;

