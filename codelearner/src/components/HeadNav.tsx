import { Container } from "react-bootstrap";
import Auth from "./modal/Auth";
import logo from "/assets/logo/codelearner.svg";
import "./style/Navbar.css";

function HeadNav() {
  return (
    <div className="bg-dark py-3">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo-img d-flex">
            <div className="ratio-16-9">
              <img className="img-fluid" src={logo} alt="Ironhack logo" />
            </div>
            <span className="text-white align-content-center ms-3 font-monospace">
              Ironhack
            </span>
          </div>

          <div className="d-flex align-items-center">
            <div className="d-block">
              <Auth></Auth>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HeadNav;
