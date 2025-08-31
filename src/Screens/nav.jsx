import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/nav.css'

function BasicExample() {

      const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="custom-brand">
        <i class="fa-solid fa-cloud-moon"></i>
          Blue-Moon Diary 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {/* <Nav.Link href="/" className="custom-navlink">
          <i class="fa-solid fa-house"></i>&nbsp;Home
            </Nav.Link> */}
            <Nav.Link href="/diary" className="custom-navlink">
            <i class="fa-solid fa-book"></i>&nbsp;Diary
            </Nav.Link>
            <Nav.Link href="/input" className="custom-navlink">
              <i className="fa-solid fa-notes-medical"></i>&nbsp;Add
            </Nav.Link>
            <Nav.Link href="/profile" className="custom-navlink">
              <i className="fa-solid fa-user"></i>&nbsp;Profile
            </Nav.Link>
            <Nav.Link href="/analytics" className="custom-navlink">
            <i class="fa-solid fa-chart-simple"></i>&nbsp;Analytics
            </Nav.Link>
            {/* <Nav.Link href="/Cuztomise" className="custom-navlink">
            <i class="fa-solid fa-chart-simple"></i>&nbsp;Cuztomise
            </Nav.Link> */}
            <Nav.Link className="custom-navlink" onClick={handleLogout}>
             <i className="fa-solid fa-right-from-bracket"></i>&nbsp;Logout 
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default BasicExample;