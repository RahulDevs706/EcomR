import {
    CREATE_ORDER_FAIL, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_REQUEST,
    MY_ORDER_FAIL, 
    MY_ORDER_SUCCESS, 
    MY_ORDER_REQUEST,
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_REQUEST, 
    CLEAR_ERRORS,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL
} from "../constants/orderConstant"

import axios from "axios"

// Create order
export const createOrder = (order)=>async (dispatch, getState)=>{
    try {

        dispatch({
            type:CREATE_ORDER_REQUEST,
        })

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post("/api/order/new",
            order, config
        )

        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data
        })

        
    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
}

// My orders
export const myOrders = ()=>async (dispatch, getState)=>{
    try {

        dispatch({
            type:MY_ORDER_REQUEST,
        })


        const {data} = await axios.get("/api/orders/my")

        dispatch({
            type:MY_ORDER_SUCCESS,
            payload:data.orders
        })

        
    } catch (error) {
        dispatch({
            type:MY_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
}

// Order Details
export const orderDetails = (id)=>async (dispatch, getState)=>{
    try {

        dispatch({
            type:ORDER_DETAILS_REQUEST,
        })

        const {data} = await axios.get(`/api/order/${id}`)

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data.order
        })

        
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

// All orders 
export const allOrders = ()=>async (dispatch, getState)=>{
    try {

        dispatch({
            type:ALL_ORDER_REQUEST,
        })


        const {data} = await axios.get("/api/admin/orders")

        dispatch({
            type:ALL_ORDER_SUCCESS,
            payload:data.orders
        })

        
    } catch (error) {
        dispatch({
            type:ALL_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
}

// Update order
export const updateOrder = (order, id)=> async(dispatch)=>{
    try {
        dispatch({
            type:UPDATE_ORDER_REQUEST
        });

        const config = {
            headers:{"content-type":"multipart/form-data"}
        }


        const {data} = await axios.put(`/api/admin/order/${id}`,order,config);
        


        dispatch({
            type:UPDATE_ORDER_SUCCESS,
            payload:data.success
        })

    } catch (error) {
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete order
export const deleteOrder = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:DELETE_ORDER_REQUEST
        });

        const {data} = await axios.delete(`/api/admin/order/${id}`);
        

        dispatch({
            type:DELETE_ORDER_SUCCESS,
            payload:data.success
        })

    } catch (error) {
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearError = ()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}