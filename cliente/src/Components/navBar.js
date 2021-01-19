import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../SCSS/navBar.scss'

export default function NavBar(){
    return(
        <div>
            <ReactBootStrap.Navbar className="nav" collapseOnSelect expand="lg" variant="dark">
                <Link to="/">
                    <ReactBootStrap.Navbar.Brand href="/"><span className="navItem">Libreria Panchitos</span></ReactBootStrap.Navbar.Brand>
                </Link>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto"> 

                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                        <Link to="/libros">
                            <ReactBootStrap.Nav.Link href="/libros"><span className="navItem">Libros</span></ReactBootStrap.Nav.Link>
                        </Link>
                        <Link to="/autores">
                            <ReactBootStrap.Nav.Link href="/autores"><span className="navItem">Autores</span></ReactBootStrap.Nav.Link>
                        </Link>
                        <Link to="/editoriales">
                            <ReactBootStrap.Nav.Link href="/editorales"><span className="navItem">Editoriales</span></ReactBootStrap.Nav.Link>
                        </Link>
                        <ReactBootStrap.NavDropdown title="Productos" id="collasible-nav-dropdown">
                            <Link to="/bodega">
                                <ReactBootStrap.NavDropdown.Item href="/bodega"><span className="navItem">Bodega</span></ReactBootStrap.NavDropdown.Item>
                            </Link>
                            <Link to="/categoria">
                                <ReactBootStrap.NavDropdown.Item href="/categoria"><span className="navItem">Categorias</span></ReactBootStrap.NavDropdown.Item>
                            </Link>
                        </ReactBootStrap.NavDropdown>
                        <ReactBootStrap.NavDropdown title="Compras" id="collasible-nav-dropdown">
                            <Link to="/det_factura">
                                <ReactBootStrap.NavDropdown.Item href="/det_factura"><span className="navItem">Facturas</span></ReactBootStrap.NavDropdown.Item>
                            </Link>
                            <Link to="/det_pedido">
                                <ReactBootStrap.NavDropdown.Item href="/det_pedido"><span className="navItem">Pedidos</span></ReactBootStrap.NavDropdown.Item>
                            </Link>
                        </ReactBootStrap.NavDropdown>
                        
                    </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        </div>
        );
    }