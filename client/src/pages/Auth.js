import React, {useContext, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN, REGISTRATION, SHOP_ROUTE} from "../utils/Consts";
import {login, registration} from "../htttp/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () =>{
        try {
            let data
            if (isLogin){
                data = await login(email, password)
            }else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        }catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto">{ isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row >
                        <div className="d-flex flex-row justify-content-between">
                            {isLogin ?
                                <div className="mt-3">
                                    Нет аккаунта?
                                    <NavLink className="m-2" to={REGISTRATION}>Зарегестрируйтесь</NavLink>
                                </div>
                                :
                                <div className="mt-3">
                                    Есть аккаунт?
                                    <NavLink className="m-2" to={LOGIN}>Войдите</NavLink>
                                </div>}
                            <Button
                                className="mt-3 align-self-end"
                                variant={"outline-success"}
                                onClick={click}

                            >
                                {isLogin ? 'Войти': 'Зарегистрироваться'}
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Card>


        </Container>
)});

export default Auth;