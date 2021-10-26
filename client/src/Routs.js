import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN, REGISTRATION, SHOP_ROUTE} from "./utils/Consts";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Store from "./pages/Store";
import DevicePage from "./pages/DevicePage";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: Admin
    },
    {
        path: BASKET_ROUTE,
        component: Basket
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        component: Store
    },
    {
        path: LOGIN,
        component: Auth
    },
    {
        path: REGISTRATION,
        component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        component: DevicePage
    },
]