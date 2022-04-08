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
    NEW_REVIEW_RESET,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    CLEAR_ERRORS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET
} from '../constants/productConstant'

// Get all products
export const productReducer = (state={products:[]}, action)=>{

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return{
                loading:true,
                product:[]
            };

        case ALL_PRODUCT_SUCCESS:  

            return{
                loading:false,
                product:action.payload.AllProducts,
                productsCount:action.payload.productCount,
                resultPerPage:action.payload.resultPerPage,
                filteredProductsCount:action.payload.filteredProductsCount,
            };

        case ADMIN_PRODUCT_SUCCESS:
            return{
                loading:false,
                product:action.payload
            }

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload
            };

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            };

        default:
            return state;
    }


};

// Get Product Details
export const productDetailReducer = (state={product:{}}, action)=>{

    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return{
                loading:true,
                ...state
            };

        case PRODUCT_DETAIL_SUCCESS:           
            return{
                loading:false,
                product:action.payload,

            };

        case PRODUCT_DETAIL_FAIL:
            return{
                loading:false,
                error:action.payload
            };

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            };

        default:
            return state;
    }


};

// Create new product 
export const newProductReducer = (state={ }, action)=>{

    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true,
            };

        case NEW_PRODUCT_SUCCESS:           
            return{
                loading:false,
                success:action.payload.success,
                product:action.payload.product
            };

        case NEW_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
        
        case NEW_PRODUCT_RESET:
            return{
                ...state,
                success:false
            };

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            };

        default:
            return state;
    }


};

// Update or delete Product
export const updateProductReducer = (state={}, action)=>{
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true,
            }
        
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }                
            
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading:false,
                deleted:action.payload
            }

            

        case UPDATE_PRODUCT_RESET:
            return{
                ...state,
                success:false
            }

        case DELETE_PRODUCT_RESET:
            return{
                ...state,
                deleted:false
            }
        

        
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            };    
        default:
            return state;
    }

}

// Create new review
export const newReviewReducer = (state={ }, action)=>{

    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,
            };

        case NEW_REVIEW_SUCCESS:           
            return{
                loading:false,
                success:action.payload,

            };

        case NEW_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
        
        case NEW_REVIEW_RESET:
            return{
                ...state,
                success:false
            };

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            };

        default:
            return state;
    }


};

// Get all review 
export const allReviewReducer = (state={reviews:[]}, action)=>{

    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,
            };

        case ALL_REVIEW_SUCCESS:  
            return{
                loading:false,
                review:action.payload,
            };



        case ALL_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            };

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            };

        default:
            return state;
    }
};


// delete review
export const reviewReducer = (state={ }, action)=>{

    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,
            };

        case DELETE_REVIEW_SUCCESS:           
            return{
                loading:false,
                isDeleted:action.payload,
            };

        case DELETE_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
        
        case DELETE_REVIEW_RESET:
            return{
                ...state,
                isDeleted:false
            };

        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            };

        default:
            return state;
    }


};