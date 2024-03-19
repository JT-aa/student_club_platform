import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'; 
import { FaUser } from 'react-icons/fa'; 
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/white_logo.svg'
import { Link } from 'react-router-dom';


const Header = ({ title }) => {
    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
                <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height={40} width={40}/>
                        &nbsp;&nbsp;&nbsp;{title}
                    </Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                        <LinkContainer to="/login">
                            <Nav.Link>
                                <FaUser /> Sign In
                            </Nav.Link>
                        </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;