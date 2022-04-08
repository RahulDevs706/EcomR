import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from '../constants/cartConstant'
import axios from 'axios'

// Add item to cart
export const addITemsTocart = (id, quantity)=> async(dispatch, getState)=>{
     
    const {data} = await axios.get(`/api/product/${id}`);

    const {_id,name,price,stock} = data.product
        
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:_id,
            name:name,
            price:price,
            image:data?.product?.images[0].url,
            stock:stock,
            quantity:quantity
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// Remove item from cart
export const removeItemFromCart = (id)=> async(dispatch, getState)=>{
    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

// Save shipping info
export const saveShippingInfo = (data)=> async(dispatch, getState)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    })

    localStorage.setItem("shippingInfo", JSON.stringify(data));

}