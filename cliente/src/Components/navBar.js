import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../SCSS/navBar.scss'

export default function NavBar(){
    return(
        <div>
            <ReactBootStrap.Navbar className="nav" collapseOnSelect expand="lg" variant="dark">
                <Link to="/">
                    <ReactBootStrap.Navbar.Brand href="/"><span className="navItem">Libreria Online</span></ReactBootStrap.Navbar.Brand>
                </Link>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto"> 

                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                        <Link to="/libros">
                            <ReactBootStrap.Nav.Link href="/libros"><span className="navItem">Libros</span></ReactBootStrap.Nav.Link>
                        </Link>
                        <Link to="/factura">
                            <ReactBootStrap.Nav.Link href="/factura"><span className="navItem">Facturas</span></ReactBootStrap.Nav.Link>
                        </Link>
                        <ReactBootStrap.NavDropdown title="Personal" id="collasible-nav-dropdown">
                            <Link to="/empleado">
                                <ReactBootStrap.NavDropdown.Item href="/empleado"><span className="navItem">Empleados</span></ReactBootStrap.NavDropdown.Item>
                            </Link>
                            <Link to="/proveedor">
                                <ReactBootStrap.NavDropdown.Item href="/proveedor"><span className="navItem">Proveedores</span></ReactBootStrap.NavDropdown.Item>
                            </Link>
                        </ReactBootStrap.NavDropdown>
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