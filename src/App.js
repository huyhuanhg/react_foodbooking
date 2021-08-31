import {Router, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import moment from "moment";

import history from './utils/history';

import FullLayout from "./layouts/FullLayout";
import NotFoundPage from "./pages/NotFound";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";

import LoginPage from "./pages/authClient/Login";

import AdminLoginPage from "./pages/AdminLogin";

import DashboardPage from "./pages/admins/Dashboard";

import HomePage from "./pages/clients/HomePage";
import CategoryPage from "./pages/admins/Category";
import RegisterPage from "./pages/authClient/Register";
import StoreDetail from "./pages/clients/StoreDetail";
import CartPage from "./pages/clients/Cart";
import UserProfile from "./pages/clients/UserProfile";

import 'antd/dist/antd.less';
import './App.css';
import {
    getAdminInfoAction,
    getUserInfoAction,
    refreshAdminTokenUserAction,
    refreshTokenUserAction
} from "./redux/actions";
import ClientList from "./pages/clients/List";


function App() {
    //gọi userInfo và adminInfo tại đây

    const dispatch = useDispatch();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        if (userInfo) {
            let time = userInfo.expires - moment().valueOf() / 1000;
            if (time < 86400) {
                if (time < 0) {
                    localStorage.removeItem('userInfo');
                } else {
                    dispatch(refreshTokenUserAction({
                        data: userInfo.access_token
                    }))
                }
            } else {
                dispatch(getUserInfoAction({data: userInfo.access_token}));
            }
        }
        if (adminInfo) {
            let time = adminInfo.expires - moment().valueOf() / 1000;
            if (time < 86400) {
                if (time < 0) {
                    localStorage.removeItem('adminInfo');
                } else {
                    dispatch(refreshAdminTokenUserAction({
                        data: adminInfo.access_token
                    }))
                }
            } else {
                dispatch(getAdminInfoAction({data: adminInfo.access_token}));
            }
        }
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <ClientLayout exact path="/" component={HomePage}/>

                <ClientLayout exact path="/stores" component={ClientList}/>
                <ClientLayout exact path="/foods" component={ClientList}/>
                <ClientLayout exact path="/promotions" component={ClientList}/>
                <ClientLayout exact path="/crowded" component={ClientList}/>
                <ClientLayout exact path="/favorite" component={ClientList}/>

                <ClientLayout path="/stores/:slug" component={StoreDetail}/>

                <ClientLayout exact path="/cart" component={CartPage}/>

                <ClientLayout path="/profile/:page" component={UserProfile}/>

                <AdminLayout exact path="/manager" component={DashboardPage}/>
                <AdminLayout exact path="/manager/categories" component={CategoryPage}/>

                <FullLayout exact path="/login" component={LoginPage}/>
                <FullLayout exact path="/register" component={RegisterPage}/>
                <FullLayout exact path="/manager/login" component={AdminLoginPage}/>

                <FullLayout component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

export default App;
