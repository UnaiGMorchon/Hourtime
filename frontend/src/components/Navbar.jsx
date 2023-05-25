import { Link } from "react-router-dom";
import "../css/navbar.css";

const NavbarComponent = () => {
  return (
    <nav style={{ backgroundColor: "light", position: "fixed", top: 0 }}>
      <Link to='/' style={{ marginRight: "10px" }}>
        Unai
      </Link>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Link to='/buscador'>buscador</Link>
        <Link to='/reloj'>reloj</Link>
      </div>
    </nav>
  );
};

export default NavbarComponent;
