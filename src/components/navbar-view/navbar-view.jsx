import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import "./navbar-view.scss";

import { connect } from 'react-redux';
import { setUserObject } from '../../actions/actions';

export function NavBar({ userObject }) {

    const currentUser = localStorage.getItem("user");

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (

        <Navbar className="main-nav" sticky="top" bg="light" expand="lg" variant="light">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">
                    myFlixCinema
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && <Nav.Link href="/profile">{currentUser}</Nav.Link>}
                        {isAuth() && <Button variant="link" onClick={() => {
                            onLoggedOut()
                        }}>Logout</Button>}
                        {currentUser ? null : <Nav.Link href="/">Sign-in</Nav.Link>}

                        {currentUser ? null : <Nav.Link href="/register">Sign-up</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

let mapStateToProps = state => {
    return { userObject: state.userObject }
}

export default connect(mapStateToProps, { setUserObject })(Navbar);