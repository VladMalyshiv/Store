import React, {useContext} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN, SHOP_ROUTE} from "../utils/Consts";
import Button from "react-bootstrap/Button";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'

const NavBar = observer( () => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () =>{
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="blue">
            <Container>
                <NavLink style={{color:'white', textDecoration:'none'}} to={SHOP_ROUTE}>ТехноМощь </NavLink>
                {user.isAuth ?
                    <Nav style={{color:'white'}}>
                        <Button
                            variant="outline-light"
                            onClick={()=>history.push(ADMIN_ROUTE)}
                        >
                            Панель Администратора
                        </Button>
                        <Button
                            variant="outline-light"
                            className="ml-2"
                            onClick={()=>logOut()}
                            style={{marginLeft:'1rem'}}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav style={{color:'white'}}>
                        <Button variant="outline-light" onClick={() => history.push(LOGIN)}>Авторизация</Button>
                    </Nav>}
            </Container>
        </Navbar>
    );
});

export default NavBar;