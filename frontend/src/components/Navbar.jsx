import { Link } from "react-router-dom";
import "../css/navbar.css";

const NavbarComponent = () => {
  return (
    <nav>
      <Link to='/'>Nimbus</Link>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        {/*   <Link to='/buscador'>buscador</Link>
        <Link to='/reloj'>reloj</Link> */}
      </div>
    </nav>
  );
};

export default NavbarComponent;
