import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const MyNav = () => {
  const { user } = useContext(UserContext);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <span className="brand">👾 NC GameStop!</span>{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            {" "}
            <Link to={`/`}>Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={`/reviews`}>Reviews</Link>
          </Nav.Link>
          <NavDropdown
            title={user.username ? user.username : "Account"}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item>
              <Link to={`/login`}>{user.username ? "Sign out" : "Log in"}</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to={`/user/${user.username}`}>
                Manage Account <img src={user.avatar_url} width="40px" />
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
