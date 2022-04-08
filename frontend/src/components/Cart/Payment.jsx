import React, { Fragment, useEffect, useRef } from 'react';
import CheckoutSteps from './CheckoutSteps';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import {  Typography } from '@mui/material';
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {CreditCard, VpnKey, Event} from "@mui/icons-material"
import {clearError, createOrder} from '../../actions/orderAction';
import axios from 'axios';
import './payment.css'

const Payment = ({history}) => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));


    const stripe = useStripe();
    const element = useElements();
    const dispatch = useDispatch();
    const alert = useAlert();

    const  {shippingInfo, cartItems} = useSelector(state=>state.cart);
    const  {user} = useSelector(state=>state.user);
    const  {error} = useSelector(state=>state.newOrder);

    const order = {
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice,
    }

    const payBtn = useRef(null);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice*100)
    }


    const submitHandler = async(e)=>{
        e.preventDefault();

        payBtn.current.disabled = true;

        try {

            const config = {
                "Content-Type":"application/json"
            }

            const {data} = await axios.post('/api/payment/process',
            paymentData,
            config
            )

            const client_secret = data.client_secret;

            if(!stripe || !element) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method:{
                    card:element.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pincode,
                            country:shippingInfo.country
                        }
                    }
                }
            })

            if(result.error){
                payBtn.current.disabled = false;
                alert.error(result.error);
            }else{
                if(result.paymentIntent.status==="succeeded"){
                    order.paymentInfo = {
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }

                    dispatch(createOrder(order))

                    history.push("/success")
                }else{
                    alert.error("There is some error while processing your payment, please try again sometimes later.")
                }
            }
            
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    }

    useEffect(() => {
       if(error){
           alert.error(error)
           dispatch(clearError())
       }

    }, [error, alert, dispatch]);
    
  return <Fragment>
      <MetaData title='Payment' />
      <CheckoutSteps activeStep={2} />
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={submitHandler}>
            <Typography>Card Info</Typography>
            <div>
                <CreditCard />
                <CardNumberElement className='paymentInput'/>
            </div>
            <div>
                <Event />
                <CardExpiryElement className='paymentInput'/>
            </div>
            <div>
                <VpnKey />
                <CardCvcElement className='paymentInput'/>
            </div>

            <input 
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="paymentFormBtn"
            />
        </form>

      </div>
  </Fragment>;
};

export default Payment;
