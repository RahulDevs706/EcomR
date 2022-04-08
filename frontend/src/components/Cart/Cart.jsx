import React, {Fragment} from 'react'
import './cart.css'
import CartItemCard from './CartItemCard'
import {useSelector, useDispatch} from 'react-redux'
import { addITemsTocart } from '../../actions/cartAction'
import { Link } from 'react-router-dom'
import {RemoveShoppingCart} from "@mui/icons-material"

const Cart = ({history}) => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart)
   
    const increaseQty = (id, quantity, stock)=>{
        const newQty = quantity+1;
        if(stock<=quantity){
            return;
        }
        console.log(newQty);
        dispatch(addITemsTocart(id, newQty));
    }

    const decreaseQty = (id, quantity)=>{
        const newQty = quantity-1;
        if(quantity<=1) return;
        dispatch(addITemsTocart(id, newQty));
    }

    const checkoutHandler = ()=>{
        history.push("/login?redirect=shipping")
    }

    return (
       <Fragment>
           {cartItems.length===0?(
               <div className='emptyCart'>
                    <RemoveShoppingCart />
                    <p>Your cart is empty</p>
                    <Link to="/products">View Products</Link>
                </div>) : ( 
            <Fragment>
                <div className="cartPage">
                    <div className='cartHeader'>
                        <p>Products</p>
                        <p>Quantity</p>
                        <p>Sub-Total</p>
                    </div>
                    {cartItems&&cartItems.map(item=>(
                        <div className='cartContainer' key={item.product}>
                            <CartItemCard item={item} />
                            <div className='cartInput'>
                                <button onClick={()=>decreaseQty(item.product, item.quantity)}>-</button>
                                <input type='number' value={item.quantity} readOnly />
                                <button onClick={()=>increaseQty(item.product, item.quantity, item.stock)}>+</button>
                            </div>
                            <p className='cartSubTotal'>{`₹${item.price*item.quantity}`}</p>
                        </div>
                    ))}
                    
            
                    <div className='cartGrossTotal'>
                        <div></div>
                        <div className='cartGrossTotalBox'>
                            <p>Grand Total</p>
                            <p>{`₹${cartItems.reduce((acc, item)=> acc+ item.price*item.quantity, 0)}`}</p>
                        </div>
                        <div></div>
                        <div className='checkoutBtn'>
                            <button onClick={checkoutHandler}>Proceed To Checkout</button>
                        </div>
                    </div>
                </div>
        </Fragment>)}
       </Fragment>
    )
}

export default Cart
