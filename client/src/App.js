import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/navBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./htttp/userAPI";
import Spinner from "react-bootstrap/Spinner";

const App = observer(() => {
    const {user} =useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading){
        return <Spinner animation="grow"/>
    }

  return (
      <BrowserRouter>
        <div className="App">
            <NavBar/>
            <AppRouter/>
        </div>
      </BrowserRouter>
  );
})

export default App;
