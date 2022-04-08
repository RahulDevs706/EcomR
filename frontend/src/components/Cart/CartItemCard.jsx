import React from 'react'
import { Link } from 'react-router-dom'
import './cartItemCard.css'

import { removeItemFromCart } from '../../actions/cartAction'
import { useDispatch } from 'react-redux'

const CartItemCard = ({item}) => {

    const dispatch = useDispatch();

    const handleRemove = ()=>{
        dispatch(removeItemFromCart(item.product));
    }

    return (
        <div className='cartItemCard'>
            <img src={item.image} alt={item.name} />
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: ₹${item.price}`}</span>
                <p onClick={handleRemove}>Remove</p>
            </div>
        </div>
    )
}

export default CartItemCard
