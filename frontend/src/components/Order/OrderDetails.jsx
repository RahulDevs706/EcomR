import React, { Fragment, useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { orderDetails, clearError } from '../../actions/orderAction';
import { Link, useParams } from 'react-router-dom';

import './orderDetails.css'
import { Typography } from '@mui/material';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const {order, error, loading} = useSelector(state=>state.orderDetails);


    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(orderDetails(params.id));

    }, [error, alert, dispatch, params]);





  return <Fragment>
    <MetaData title="Order Details" />
    {loading? <Loader /> : (
        <Fragment>
            <div className='orderDetailsPage'>
                <div className='orderDetailsContainer'>
                    <Typography component="h1"> Order #{order && order._id} </Typography>
                    <div className='shipping_payment_box'>
                        <div className='orderDetailsContainerBox'>
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

                        <div className='orderDetailsCartIems'>
                            <Typography>Order items:</Typography>
                            <div className='orderDetailsCartItemContainer'>
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
                </div>
            </div>
        </Fragment>
    )}
  </Fragment>;
};

export default OrderDetails;
