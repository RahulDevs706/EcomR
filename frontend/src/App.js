import './App.css';
import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"
import webFont from  "webfontloader"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home"
import ProductDetails from './components/Products/ProductDetails'
import Products from "./components/Products/Products"
import Search from "./components/Products/Search"
import LoginSignup from './components/User/LoginSignup';
import store from "./store";
import { loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import UserOptions from "./components/layout/Header/UserOptions"
import ProtectedRoutes from './Routes/ProtectedRoutes';
import UpdateProfile from "./components/User/UpdateProfile"
import Profile from "./components/User/Profile"
import UpdatePassword from "./components/User/UpdatePassword"
import ForgotPassword from "./components/User/ForgotPassword"
import ResetPassword from "./components/User/ResetPassword"
import Cart from './components/Cart/Cart'
import Shipping from "./components/Cart/Shipping"
import ConfirmOrder from "./components/Cart/ConfirmOrder"
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/orderSuccess"
import MyOrders from "./components/Order/MyOrders"
import OrderDetails from "./components/Order/OrderDetails"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Dashboard from './components/Admin/Dashboard';
import ProductsList from "./components/Admin/Product/ProductsList.jsx"
import CreateProduct from './components/Admin/Product/CreateProduct';
import UpdateProduct from './components/Admin/Product/UpdateProduct';

import OrderList from "./components/Admin/Order/OrderList.jsx"
import axios from 'axios';
import ProcessOrder from './components/Admin/Order/ProcessOrder';
import UsersList from './components/Admin/Users/UsersList';
import UpdateUser from './components/Admin/Users/UpdateUser';
import ProductReviews from './components/Admin/Reviews/ProductReviews';
import NotFound from './components/layout/NotFound';
import Contact from './components/layout/Contact/Contact';
import About from './components/layout/About/About';
function App() {

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripApiKey(){
    const {data} = await axios.get("/api/getStripeApi");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka" ]
      }
    });

    store.dispatch(loadUser());

    getStripApiKey();
  }, [])

  const {user, isAuthenticated} = useSelector(state => state.user);


  return (
    <Router>
      <Header />

        {isAuthenticated&& <UserOptions user={user} />}

        {stripeApiKey && 
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoutes exact path="/process/payment" component={Payment} />
            </Elements>
          }

        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/product/:id" component={ProductDetails} />
          
          <Route exact path="/products" component={Products} />
          
          <Route path="/products/:keyword" component={Products} />
          
          <Route exact path="/search" component={Search} />
          
          <Route exact path="/login" component={LoginSignup} />

          <Route exact path="/contact" component={Contact} />

          <Route exact path="/about" component={About} />
          
          <ProtectedRoutes exact path="/account" component={Profile} />
          
          <ProtectedRoutes exact path="/profile/update" component={UpdateProfile} />
          
          <ProtectedRoutes exact path="/password/update" component={UpdatePassword} />
          
          <Route exact path="/password/forget" component={ForgotPassword} />
          
          <Route exact path="/user/password/reset/:token" component={ResetPassword} />
          
          <Route exact path="/cart" component={Cart} />

          <ProtectedRoutes exact path="/shipping" component={Shipping} />



          <ProtectedRoutes exact path="/success" component={OrderSuccess} />
          <ProtectedRoutes exact path="/profile/orders" component={MyOrders} />


          <ProtectedRoutes exact path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoutes exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoutes isAdmin="true" exact path="/admin/dashboard" component={Dashboard} />

          <ProtectedRoutes isAdmin="true" exact path="/admin/products" component={ProductsList} />

          <ProtectedRoutes isAdmin="true" exact path="/admin/product" component={CreateProduct} />

          <ProtectedRoutes isAdmin="true" exact path="/admin/product/:id" component={UpdateProduct} />
          
          <ProtectedRoutes isAdmin="true" exact path="/admin/order" component={OrderList} />
          <ProtectedRoutes isAdmin="true" exact path="/admin/order/:id" component={ProcessOrder} />

          <ProtectedRoutes isAdmin="true" exact path="/admin/users" component={UsersList} />

          <ProtectedRoutes isAdmin="true" exact path="/admin/user/:id" component={UpdateUser} />
          
          <ProtectedRoutes isAdmin="true" exact path="/admin/reviews" component={ProductReviews} />

          <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
