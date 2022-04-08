import React, { useEffect, useState } from 'react'
import "./productDetails.css"
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, getProductDetails, createNewReview } from '../../actions/productAction'
import { useParams } from "react-router-dom"

import Loader from '../layout/Loader/Loader'

import ReviewCard from './ReviewCard.js'

import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData'
import {addITemsTocart} from '../../actions/cartAction'
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from "@material-ui/core"
import { Rating } from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstant'

const ProductDetails = (props) => {
        const dispatch = useDispatch()

        const params = useParams()

        const alert = useAlert();

        const { product, loading, error } = useSelector(state => state.productDetails);
        const { success, error:reviewError } = useSelector(state => state.newReview);


        const options = {
            value: product?.ratings,
            size: "large",
            readOnly:true,
            precision:0.5
        }

        const [quantity, setQuantity] = useState(1);
        const [open, setOpen] = useState(false);
        const [rating, setRating] = useState(0);
        const [comment, setComment] = useState("");

        const submitReviewToggle=()=>{
            setOpen(!open);
        }

        const increaseQuantity = ()=>{
            if(product.stock<=quantity) return;

            const temp = quantity+1;
            setQuantity(temp);
        }

        const decreaseQuantity = ()=>{
            if(quantity<=1) return;
            
            const temp = quantity-1;
            setQuantity(temp);
        }

        const addToCartHandler = ()=>{
            dispatch(addITemsTocart(params.id, quantity))
            alert.success("Item added to cart")
        }

        const reviewSubmitHandler = ()=>{
            const myForm = new FormData();

            myForm.set("rating", rating);
            myForm.set("comment", comment);
            myForm.set("productId", params.id);

            dispatch(createNewReview(myForm));
            setOpen(false);
        }

        useEffect(() => {
            if (error) {
                alert.error(error);
                dispatch(clearError())
            }
            if(reviewError){
                alert.error(reviewError);
                dispatch(clearError());
            }

            if(success===true){
                alert.success("Review submitted successfully");
                dispatch({type:NEW_REVIEW_RESET});
            }

            dispatch(getProductDetails(params.id))
        }, [dispatch, params.id, alert, error, reviewError, success])

    return (<>
                {
                    loading ? <Loader /> :
                    <>
                            <MetaData title = { `${product.name} --ECOM-R` } />

                            <div className = "productDetails" >
                                <div>
                                    <Carousel  className="carouselClass" > 
                                        {
                                            product?.images?.map((item, i) => ( 
                                                <img className = "carouselImage"
                                                    key = {item.url}
                                                    src = {item.url}
                                                    alt = {`${i} slide`}
                                                />
                                            ))
                                        } 
                                    </Carousel> 
                                </div> 
                                <div>
                                    <div className = "detailsBlock_1">
                                        <h2> { product.name } </h2> 
                                        <p> Product# { product._id } </p> 
                                    </div>

                                    <div className = "detailsBlock_2" >
                                        <Rating {...options }/>
                                        <span className='detailsBlock_2-span'> ({ product.numOfReviews } Reviews) </span> 
                                    </div> 

                                    <div className = "detailsBlock_3" >
                                        <h1> { `₹${product.price}` } </h1>

                                        <div className = "detailsBlock_3_1">

                                                <div className = "detailsBlock_3_1_1">
                                                    <button onClick={decreaseQuantity} > - </button> 
                                                    <input readOnly min="0" max={product.stock} value = {quantity} type = "number" />
                                                    <button onClick={increaseQuantity}> + </button> 
                                                </div>
                                                {" "} 
                                                <button disabled={product.stock<1? true:false} onClick={addToCartHandler}>Add to cart</button> 

                                        </div>

                                        <p> status: { " " } 
                                            <b className = { product.stock < 1 ? "redColor" : "greenColor" } > { product.stock < 1 ? "Out of stock" : "In stock" }</b> 
                                        </p> 

                                    </div> 

                                    <div className = "detailsBlock_4" >
                                        Description: <p> { product.description } </p> 
                                    </div> 
                                        <button onClick={submitReviewToggle} className = "submitReview" > Submit review </button> 
                                </div> 
                            </div> 
                            <h3 className = "reviewsHeading" > Reviews </h3> 

                            <Dialog
                                aria-labelledby="Submit Review"
                                open={open}
                                onClose={submitReviewToggle}
                            >
                                <DialogTitle>Submit Review</DialogTitle>
                                <DialogContent className="submitDialog">
                                    <Rating 
                                        onChange={(e)=>setRating(e.target.value)}
                                        value={rating}
                                        size='large'
                                    />

                                    <textarea 
                                        className='submitDialogTextarea'
                                        cols="30"
                                        rows="5"
                                        value={comment}
                                        onChange={(e)=>setComment(e.target.value)}
                                    />
                                </DialogContent>

                                <DialogActions>
                                    <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
                                    <Button onClick={reviewSubmitHandler}>Submit</Button>
                                </DialogActions>
                            </Dialog>

                            {product.reviews && product.reviews[0] ? ( 
                                <div className = "reviews"> {
                                    product.reviews.map((review) => <ReviewCard review = { review } />)
                                    } 
                                </div>):(<p className = "noReviews" > No reviews yet </p>)
                            } 
                    </>
                }
                            
            </>
        )
    }

export default ProductDetails
               