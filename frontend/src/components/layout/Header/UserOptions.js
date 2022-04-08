import React, { Fragment, useState } from 'react'
import './header.css'

import {SpeedDial, SpeedDialAction, Backdrop} from "@mui/material"
import { Dashboard, Person, ExitToApp, ListAlt, ShoppingCartOutlined } from "@mui/icons-material";
import {useHistory} from "react-router-dom"
import {useAlert} from "react-alert"
import store from "../../../store"
import { logout } from '../../../actions/userActions';
import { useSelector } from 'react-redux';

const UserOptions = ({user}) => {
    const {cartItems} = useSelector(state=>state.cart)
    const history = useHistory();
    const alert = useAlert();

    const [open, setOpen] = useState(false);

    const options =[
        { icon:<Person />, tooltipTitle:"Profile", func: account },
        { icon:<ListAlt />, tooltipTitle:"Orders", func: orders },
        { icon:<ShoppingCartOutlined style={{color:cartItems.length>0?"tomato":"unset"}} />, tooltipTitle:`Cart(${cartItems.length})`, func: cart },
        { icon:<ExitToApp />, tooltipTitle:"Logout", func: logoutUser },
    ]

    if(user.role==="admin"){
        options.unshift({ icon:<Dashboard />, tooltipTitle:"Dashboard", func: dashboard });
    }

    function dashboard() {
        history.push('/admin/dashboard')
    }
    function account() {
        history.push('/account')
    }

    function cart(){
        history.push('/cart');
    }
    function logoutUser() {
        store.dispatch(logout());
        alert.success("Logged out successfuly")
    }
    function orders() {
        history.push('/profile/orders')
    }
    
    return (
        <Fragment>
        <Backdrop className="userOptions" open={open} style={{zIndex:"10"}} />
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onOpen={()=>setOpen(true)}
                onClose={()=>setOpen(false)}
                open={open}
                style={{zIndex:"11"}}
                direction='down'
                className="speedDial"
                icon={<img 
                    className="speedDialIcon"
                    alt='Profile'
                    src={user.avatar.url? user.avatar.url: `${process.env.PUBLIC_URL}/Profile.png` }
                />}
            >
              {options.map(item=>(
                  <SpeedDialAction key={item.tooltipTitle} icon={item.icon} tooltipTitle={item.tooltipTitle} tooltipOpen={window.innerWidth<=600?true:false} onClick={item.func} />
              ))}

            </SpeedDial>
        </Fragment>
            
        
    )
}

export default UserOptions
