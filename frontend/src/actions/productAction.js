import axios from 'axios';

import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
} from '../constants/productConstant';

// Get all products for user
export const getAllProducts = (keyword="", currentPage=1, price=[0, 100000], category, ratings=0)=> async(dispatch)=>{

    let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

    if(category){
        link= `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    }

    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        });

        const {data} = await axios.get(link);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        });
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
};

// get all products --ADMIN
export const getAdminProducts = ()=> async(dispatch)=>{

    try {
        dispatch({
            type:ADMIN_PRODUCT_REQUEST
        });

        const {data} = await axios.get("/api/admin/products");

        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products
        });
    } catch (error) {
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
};

// Get products details
export const getProductDetails = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_DETAIL_REQUEST
        })

        const {data} = await axios.get(`/api/product/${id}`);

        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAIL_FAIL,
            payload:error?.response?.data?.message
        })
    }
}

// Create new Product --ADMIN
export const createNewProduct = (productData)=> async(dispatch)=>{
    try {
        dispatch({
            type:NEW_PRODUCT_REQUEST
        })

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post('/api/admin/products/new', productData, config);

        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

// Create new Review
export const createNewReview = (reviewData)=> async(dispatch)=>{
    try {
        dispatch({
            type:NEW_REVIEW_REQUEST
        })

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.put('/api/review/new', reviewData, config);

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success
        })
    } catch (error) {
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}

// Update product --ADMIN
export const updateProduct = (updateProduct, id)=> async(dispatch)=>{
    try {
        dispatch({
            type:UPDATE_PRODUCT_REQUEST
        });

        const config = {
            headers:{"content-type":"multipart/form-data"}
        }


        const {data} = await axios.put(`/api/admin/product/${id}`,updateProduct,config);
        


        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success
        })

    } catch (error) {
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete product --ADMIN
export const deleteProduct = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:DELETE_PRODUCT_REQUEST
        });

        const {data} = await axios.delete(`/api/admin/product/${id}`);
        

        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success
        })

    } catch (error) {
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all reviews --ADMIN
export const getAllReviews = (id)=> async(dispatch)=>{

    try {
        dispatch({
            type:ALL_REVIEW_REQUEST,
        });

        const {data} = await axios.get(`/api/reviews?id=${id}`);

        dispatch({
            type:ALL_REVIEW_SUCCESS,
            payload:data.reviews
        });
    } catch (error) {
        dispatch({
            type:ALL_REVIEW_FAIL,
            payload:error.response.data.message,
        });
    }
}

// Delete Review --ADMIN
export const deleteReview = (reviewId, productId)=> async(dispatch)=>{
    try {
        dispatch({
            type:DELETE_REVIEW_REQUEST,
        });

        const {data} = await axios.delete(`/api/reviews?id=${reviewId}&productId=${productId}`);
        

        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data.success
        })

    } catch (error) {
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

// clearing error
export const clearError = ()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}