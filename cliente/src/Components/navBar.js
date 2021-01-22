import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import '../SCSS/navBar.scss'

export default function NavBar(){
    return(
        <div>
            <ReactBootStrap.Navbar className="nav" collapseOnSelect expand="lg" variant="dark">
                    <ReactBootStrap.Navbar.Brand href="/"><span className="navItem">Libreria Panchitos</span></ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto"> 
                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                            <ReactBootStrap.Nav.Link href="/libros"><span className="navItem">Libros</span></ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="/autores"><span className="navItem">Autores</span></ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="/editorales"><span className="navItem">Editoriales</span></ReactBootStrap.Nav.Link>
                        <ReactBootStrap.NavDropdown title="Contenido" id="collasible-nav-dropdown">
                                <ReactBootStrap.NavDropdown.Item href="/libros">Libros</ReactBootStrap.NavDropdown.Item>
                                <ReactBootStrap.NavDropdown.Item href="/categoria"><span className="navItem">Categorias</span></ReactBootStrap.NavDropdown.Item>
                        </ReactBootStrap.NavDropdown>
                    </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        </div>
        );
    }