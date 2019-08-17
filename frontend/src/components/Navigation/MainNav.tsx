import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import AppContext from "../../context/AppContext";
import {NavLink, Link} from 'react-router-dom';

const MainNav: React.FC = () => {
    const appContext = React.useContext(AppContext);

    let r_nav = null;
    if (appContext.authenticated) {
        r_nav = [
            <Nav key="1" className="mr-auto">
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
            <Nav key="2">
                <Navbar.Text className="pr-2">
                    Signed in as: {appContext.userName}
                </Navbar.Text>
                <Nav.Link onClick={appContext.logoutRequest}>Logout</Nav.Link>
            </Nav>
        ];
    } else {
        r_nav = [
            <Nav key="1" className="mr-auto"/>,
            <Nav key="2">
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
                        height="30px"
                        className="d-inline-block align-top mr-md-3 mr-1"
                    />
                    {appContext.event.name ? appContext.event.name : 'ilSaye'}
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