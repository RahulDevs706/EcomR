import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { allReviewReducer, newProductReducer, newReviewReducer, productDetailReducer, productReducer, reviewReducer, updateProductReducer } from "./reducers/productReducers";
import { allUserReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer, userReducer_admin } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrderReducer, MyOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:MyOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    updateProduct:updateProductReducer,
    allOrders:allOrderReducer,
    orderStats:orderReducer,
    allUsers: allUserReducer,
    userDetails:userDetailsReducer,
    userStats:userReducer_admin,
    productReviews:allReviewReducer,
    reviewStats: reviewReducer,
})

let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")? 
            JSON.parse(localStorage.getItem("cartItems")):
            [],
        shippingInfo:localStorage.getItem("shippingInfo")?
            JSON.parse(localStorage.getItem("shippingInfo")):[],
    }
};

const middleWare =[thunk]

const store = createStore(reducer, 
    initialState, 
    composeWithDevTools(
        applyMiddleware(...middleWare)
    ))

export default store;