import React, {Fragment, useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews, clearError, deleteReview, getAdminProducts } from '../../../actions/productAction';
import MetaData from '../../layout/MetaData';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import { Delete, Star } from '@mui/icons-material';
import Sidebar from '../Sidebar';
import "./productReviews.css"
import { DELETE_REVIEW_RESET } from '../../../constants/productConstant';


const ProductReviews = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error:deletionError, isDeleted} = useSelector(state=>state.reviewStats)
    const {error:productError, product } = useSelector(state=>state.products);
    const {error, review, loading } = useSelector(state=>state.productReviews);

    const [productId, setProductId] = useState("");

    useEffect(() => {
        if(productId.length===24){
            dispatch(getAllReviews(productId));
        }
        if(error){
            alert.error(error);
            dispatch(clearError());
        }

        if(deletionError){
            alert.error(deletionError);
            dispatch(clearError());
        }

        if(productError){
            alert.error(productError);
            dispatch(clearError());
        }

        if(isDeleted){
            alert.success("Review deleted successfully");
            dispatch({type:DELETE_REVIEW_RESET})
        }

        dispatch(getAdminProducts())

    }, [error, alert, dispatch, isDeleted, deletionError, history, productId, productError]);

    const handleDeletion = (e, id)=>{
        e.preventDefault();

        dispatch(deleteReview(id, productId));
    }

    const columns = [
        {
            field:"id",
            headerName:"Review Id",
            minWidth: 300,
            flex:1
        },
        {
            field:"user",
            headerName:"User",
            minWidth: 150,
            flex:0.3,
        },
        {
            field:"comment",
            headerName:"Comment",
            minWidth: 350,
            flex:1,
        },
        {
            field:"ratings",
            headerName:"Ratings",
            minWidth: 270,
            flex:0.5,
            type:"number",
            cellClassName:(params)=>{
                return params.getValue(params.id, "ratings") >=3 ? "greenColor" : "redColor";
            }
        },
        {
            field:"action",
            headerName:"Action",
            minWidth: 150,
            flex:0.3,
            type:"number",
            sortable:false,
            renderCell: (params)=>{
                return(
                    <Fragment>
                        <Button onClick={(e)=>handleDeletion(e, params.getValue(params.id, "id"))}><Delete /></Button>
                    </Fragment>
                )
            }
        }
    ]

    const rows = [];

    review && review.forEach(item => {
        rows.push({
            id:item._id,
            user:item.name,
            comment:item.comment,
            ratings:item.rating
        })
    });


    const handleSubmit = (e)=>{
        e.preventDefault();

        dispatch(getAllReviews(productId));

    }

    

  return <Fragment>
    <MetaData title="All Reviews --Admin" />

    <div className='dashboard'>
        <Sidebar />
        <div className='productReviewsContainer'>

            <form 
                className="productReviewsForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <h1 className='productReviewsFormHeading'> ADMIN PANEL <br/> ALL REVIEWS </h1>

                <div>
                    <Star />
                     
                    <select value={productId} onChange={e=>setProductId(e.target.value)}>
                        <option value="">Choose Product</option>
                        {product?.map((item)=>{
                            return(
                                <option key={item._id} value={item._id}>
                                {window.innerWidth>600?`${item._id} (${item.name.substr(0, 25)}...)`:`${item._id}`}
                                </option>)
                            })}
                    </select>
                </div>


                <button
                id='createProductBtn'
                type='submit'
                disabled={loading? true:false || productId===""? true:false}
                >
                    Search 
                </button>


            </form>

            {review && review.length>0? (<DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='productsListTable'
                autoHeight
            />):(<h1 className='productReviewsFormHeading'>
                No reviews found
            </h1>)}

            
        </div>

    </div>

  </Fragment>;
};


export default ProductReviews