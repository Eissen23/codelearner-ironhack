import { Container } from "react-bootstrap";
import Auth from "./auth/Auth";
import logo from "/assets/logo/codelearner.svg";
import "../assets/style/Navbar.css";
import { useAuth } from "../context/auth/AuthContext";
import MenuNav from "../features/main/nav-tab/MenuNav";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { userItems, menuItems } from "../data/MenuData";

interface HeadNavProps {
  fixed?: boolean
}


const HeadNav:React.FC<HeadNavProps> = ({fixed}) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className={`z-3 bg-dark py-2 w-100 ${fixed && "position-fixed"}`}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo-img d-flex">
            <Link to="/">
              <div className="ratio-16-9">
                <img className="img-fluid" src={logo} alt="Ironhack logo" />
              </div>
            </Link>
            <span className="text-white align-content-center ms-3 font-monospace">
              Ironhack
            </span>
          </div>

          <div className="d-flex align-items-center">
            <div>
              <MenuNav items={isAuthenticated ? userItems : menuItems} />
            </div>
            <div className="d-block ms-2">
              {isAuthenticated ? <ProfileDropdown /> : <Auth />}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HeadNav;
