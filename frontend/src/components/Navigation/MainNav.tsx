import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import AuthContext from "../../context/auth-context";
import Button from "react-bootstrap/Button";
import {NavLink, Link} from 'react-router-dom';

const MainNav: React.FC = () => {
    const authContext = React.useContext(AuthContext);

    let r_nav = null;
    if (authContext.authenticated) {
        r_nav = [
            <Nav className="mr-auto">
                <Nav.Link href="#home">Announcements</Nav.Link>
                <Nav.Link href="#link">Help Desk</Nav.Link>
                <Nav.Link href="#interact">Interact</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>,
            <Nav>
                <Navbar.Text className="pr-2">
                    Signed in as: {authContext.userName}
                </Navbar.Text>
                <Button onClick={authContext.logout}>Logout</Button>
            </Nav>
        ];
    } else {
        r_nav = [
            <Nav className="mr-auto"/>,
            <Nav>
                <Link to="/join" className="nav-link">
                    Login
                </Link>
            </Nav>
        ]
    }

    return (
        <Navbar bg="light" expand="lg">
            <NavLink to="/">
                <Navbar.Brand>
                    <img
                        alt=""
                        src="/ilSayeLogo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top pr-1"
                    />
                    {'ilSaye'}
                </Navbar.Brand>
            </NavLink>
            {r_nav !== null ? <Navbar.Toggle aria-controls="basic-navbar-nav"/> : null}
            <Navbar.Collapse id="basic-navbar-nav">
                {r_nav}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNav