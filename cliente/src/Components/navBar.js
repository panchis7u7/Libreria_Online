import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import '../SCSS/navBar.scss'

export default function NavBar(){
    return(
        <div className="main-nav">
            <ReactBootStrap.Navbar className="nav" collapseOnSelect expand="lg" variant="dark">
                    <ReactBootStrap.Navbar.Brand href="/main"><span className="navItem">Libreria Panchitos</span></ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto"> 
                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                            <ReactBootStrap.Nav.Link href="/libros"><span className="navItem">Libros</span></ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="/autores"><span className="navItem">Autores</span></ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="/editoriales"><span className="navItem">Editoriales</span></ReactBootStrap.Nav.Link>
                        <ReactBootStrap.NavDropdown title="Contenido" id="collasible-nav-dropdown">
                                <ReactBootStrap.NavDropdown.Item href="/almacenes">Almacenes</ReactBootStrap.NavDropdown.Item>
                                <ReactBootStrap.NavDropdown.Item href="/librosAlmacen">Libros almacenados</ReactBootStrap.NavDropdown.Item>
                        </ReactBootStrap.NavDropdown>
                        <ReactBootStrap.NavDropdown title="Personal ?" id="collasible-nav-dropdown">
                                <ReactBootStrap.NavDropdown.Item href="/clientes">Clientes</ReactBootStrap.NavDropdown.Item>
                        </ReactBootStrap.NavDropdown>
                    </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        </div>
        );
    }