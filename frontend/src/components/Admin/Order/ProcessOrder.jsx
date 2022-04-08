import { Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Loader from '../../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { clearError, orderDetails, updateOrder } from '../../../actions/orderAction';
import { AccountTree } from '@mui/icons-material';

import "./processOrder.css"
import { UPDATE_ORDER_RESET } from '../../../constants/orderConstant';


const ProcessOrder = () => {

    const {order, error, loading} = useSelector(state=>state.orderDetails);
    const {isUpdated, error:updateError} = useSelector(state=>state.orderStats);



    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearError());
        }

        if(isUpdated){
            alert.success("Status updated successfully")
            dispatch({type:UPDATE_ORDER_RESET})            
        }

        dispatch(orderDetails(params.id));
        
    }, [error, alert, dispatch, params,isUpdated, updateError]);

    const [status, setStatus] = useState("");

    const handleUpdateSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(myForm, params.id))
    }

  return <Fragment>

    <MetaData title="Update Product --Admin Panel" />
    <div className='dashboard'>
    <Sidebar />
        <div className='createProductContainer updateOrderContainer'>
            {loading?<Loader />:(
                <div className='confirmOrderPage' style={order.orderStatus==="Delivered"?{gridTemplateColumns:"none"}:null} >
                    <div>
                            <div className='confirmShippingArea process'>
                                <div className='orderDetailsContainerBox processDetails'>
                                    <Typography>Shipping Info</Typography>
                                    <div>
                                        <p>Name:</p>
                                        <span>{ order.user?.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>{order.shippingInfo?.phoneNo}</span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>{`${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.state}, ${order.shippingInfo?.pincode}, ${order.shippingInfo?.country}`}</span>
                                    </div>
                                </div>

                                <div className='orderDetailsContainerBox'>
                                    <Typography>Payment Info</Typography>
                                    <div>
                                        <p>Status:</p>
                                        <span className={order.paymentInfo?.status==="succeeded"? "greenColor":"redColor"}>
                                            {order.paymentInfo?.status==="succeeded"? "PAID": "FAILED"}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Amount:</p>
                                        <span>₹{order?.totalPrice}</span>
                                    </div>
                                </div>
                                
                            </div>

                            <div className='orderDetailsContainerBox'>
                                <Typography>Order Info</Typography>
                                    <div>
                                        <p> Status:</p>
                                        <span className={order.orderStatus && order.orderStatus==="Delivered"? "greenColor":"redColor"}>
                                            {order.orderStatus && order.orderStatus}
                                        </span>
                                    </div>
                                </div>

                            <div className='confirmCartItems updateCartItem'>
                                <Typography>{`${order.user?.name}'s cart items:`}</Typography>
                                <div className='confirmCartItemContainer updateCart'>
                                    {
                                        order.orderItems &&
                                        order.orderItems.map(item=>(
                                                <div key={item.product}>
                                                    <img src={item.image} alt={item.product} />
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    <span>
                                                        {item.quantity} X ₹{item.price} = <b>{item.price * item.quantity}</b>
                                                    </span>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                    </div>

                    <form 
                       className="createProductForm updateOrder"
                       encType="multipart/form-data"
                       onSubmit={handleUpdateSubmit}
                       style={order.orderStatus==="Delivered"?{display:"none"}:null}
                    >
                       <h1>Process Order</h1>
                        <div>
                        <AccountTree />
                        <select  onChange={e=>setStatus(e.target.value)}>
                            <option value="">Update order status</option>
                            {order.orderStatus==="Processing"? (
                                <option vlaue="Shipped">Shipped</option>
                            ):null}

                            {order.orderStatus==="Shipped"? (
                                <option vlaue="Delivered">Delivered</option>                    
                            ):null}
                        </select>
                        </div>
                                                
                        <button
                        id='createProductBtn'
                        type='submit'
                        disabled={loading? true:false || status === ""? true:false}
                        >
                        Process Order
                        </button> 
                   </form>
                </div>
            )}
        </div>

    </div>
   
  </Fragment>
};


export default ProcessOrder;
