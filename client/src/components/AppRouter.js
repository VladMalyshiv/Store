import React, {useContext} from 'react';
import {authRoutes, publicRoutes} from "../Routs";
import {Route, Switch, Redirect} from 'react-router-dom'
import {SHOP_ROUTE} from "../utils/Consts";
import {Context} from "../index";


const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, component}) =>
                <Route key={path} path={path} component={component} exact/>
            )}
            {publicRoutes.map(({path, component}) =>
                <Route key={path} path={path} component={component} exact/>
            )}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;