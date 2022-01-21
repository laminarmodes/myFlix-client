import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Link from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import "./navbar-view.scss";

export function NavBar({ user }) {

    const currentUser = localStorage.getItem("user");

    onLoggedOut = () => {
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
                        {isAuth() && <Nav.Link href={`/user/${currentUser}`}>{currentUser}</Nav.Link>}
                        {isAuth() && <Button variant="link" onClick={() => {
                            this.onLoggedOut()
                        }}>Logout</Button>}
                        {isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
                        {isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}