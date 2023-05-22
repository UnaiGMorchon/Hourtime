import { Link } from "react-router-dom";
import "./navbar.css";
/* import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
 */
const NavbarComponent = () => {
  return (
    /*  <Navbar bg='light' fixed='top'>
      <Navbar.Brand href='/'>Unai</Navbar.Brand>
      <Nav justify variant='tabs' defaultActiveKey='/'>
        <Nav.Link as={Link} to='/'>
          Home{" "}
        </Nav.Link>

        <Nav.Link as={Link} to='/prediction'>
          Predicciones{" "}
        </Nav.Link>
      
        <Nav.Link as={Link} to='/beach'>
          Playas{" "}
        </Nav.Link> 
      </Nav>
    </Navbar> */
    <nav style={{ backgroundColor: "light", position: "fixed", top: 0 }}>
      <Link to='/' style={{ marginRight: "10px" }}>
        Unai
      </Link>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Link to='/' style={{ marginRight: "10px" }}>
          Home
        </Link>
        <Link to='/prediction' style={{ marginRight: "10px" }}>
          Predicciones
        </Link>
        <Link to='/horasmundo'>Horas del mundo</Link>
      </div>
    </nav>
  );
};

export default NavbarComponent;
