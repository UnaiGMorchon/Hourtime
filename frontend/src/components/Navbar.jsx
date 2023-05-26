import { Link } from "react-router-dom";
import "../css/navbar.scss";

const NavbarComponent = () => {
  return (
    <nav className='nimbus'>
      <Link to='/'>Nimbus</Link>
      {/*
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to='/buscador'>buscador</Link>
        <Link to='/reloj'>reloj</Link> */}
    </nav>
  );
};

export default NavbarComponent;
