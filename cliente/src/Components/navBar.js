import * as ReactBootStrap from 'react-bootstrap';
import Popup from 'reactjs-popup';
import '../SCSS/navBar.scss';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from './userContext';

export default function NavBar(props){
    const {user, setUser} = useContext(UserContext);
    
    const history = useHistory();
    let state = JSON.parse(localStorage["appState"]);
    const onLogout = () => {
        setUser(false);
        state.isLoggedIn = false;
        localStorage["appState"] = JSON.stringify(state);
        history.push("/");
    }
    return(
        <div className="main-nav">
            <ReactBootStrap.Navbar hidden={!user} className="nav" collapseOnSelect expand="lg" variant="dark">
                    <ReactBootStrap.Navbar.Brand href="/main"><span className="navItem">Libreria Panchitos</span></ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto"> 
                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                        <ReactBootStrap.Nav.Link href="/libros"><span className="navItem">Libros</span></ReactBootStrap.Nav.Link>
                        <ReactBootStrap.NavDropdown title="Contenido" id="collasible-nav-dropdown">
                            <ReactBootStrap.NavDropdown.Item href="/almacenes">Almacenes</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Item href="/librosAlmacen">Libros almacenados</ReactBootStrap.NavDropdown.Item>
                        </ReactBootStrap.NavDropdown>
                        <ReactBootStrap.NavDropdown title="Usuarios" id="collasible-nav-dropdown">
                            <ReactBootStrap.NavDropdown.Item href="/clientes">Clientes</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Item href="/autores">Autores</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Item href="/editoriales">Editoriales</ReactBootStrap.NavDropdown.Item>
                        </ReactBootStrap.NavDropdown>
                        <ReactBootStrap.Nav.Link id="nav-usuario" href="/carrito">
                            <img alt="login" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3wb_RqiZ67AK3X1QuQg4F7IS65-6FuSYrCQ&usqp=CAU"></img>
                            Carrito de compras
                        </ReactBootStrap.Nav.Link>
                        <Popup className="pop-user" trigger={
                            <ReactBootStrap.Nav.Link id="nav-usuario">
                                <img alt="usuario" src="https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"></img>
                                Perfil</ReactBootStrap.Nav.Link>
                            } position="bottom buttom">
                            Hola <strong>{state.user.nombre}</strong>!<br></br>
                            <hr></hr>
                            <ReactBootStrap.Button id="btnSalir" as="button" onClick={() => {onLogout()}}>Salir</ReactBootStrap.Button>
                        </Popup>
                    </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        </div>
        );
    }