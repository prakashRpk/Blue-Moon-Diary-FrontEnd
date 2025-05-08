import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nav.css'

function BasicExample() {
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
            <i class="fa-solid fa-chart-simple"></i>&nbsp;analytics
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default BasicExample;