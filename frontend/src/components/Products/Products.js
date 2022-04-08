import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import "./products.css"

import { clearError, getAllProducts } from '../../actions/productAction'
import ProductCard from '../Home/ProductCard'
import Loader from '../layout/Loader/Loader'
import Paginaiton from "react-js-pagination";

import {Typography, Slider} from "@mui/material/";
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData'

const categories = [
    "Mobiles, Computers",
    "TV, Appliances, Electronics",
    "Men's Fashion",
    "Women's Fashion",
    "Home, Kitchen, Pets",
    "Beauty, Health, Grocery",
    "Sports, Fitness, Bags, Luggage",
    "Toys, Baby Products, Kids' Fashion",
    "Car, Motorbike, Industrial",
    "Books & Audible",
  ]


const Products = ({match}) => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 100000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState()

    const alert = useAlert();


    const {error, loading, product, productsCount, resultPerPage, filteredProductsCount} = useSelector((state)=>state.products);

    const {keyword} = match.params;

    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice)=>{
        setPrice(newPrice);
    }


    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getAllProducts(keyword, currentPage, price,category, ratings))
    }, [dispatch, keyword, currentPage, price,category, ratings, alert, error]);

    let count = filteredProductsCount;

    return (
        <Fragment>
        <MetaData title="Products -- ECOM-R" />

        <h3 className="productsHeading">Products</h3>
        <div className="filterBox">
            <Typography>Price</Typography>
            <Slider 
                value={price}
                valueLabelDisplay="auto"
                onChange={priceHandler}
                aria-labelledby="range-slider"
                min={0}
                max={100000}
            />
            <Typography>Categories</Typography>
            <ul className="categoriesBox">
                {categories.map(category=>(
                    <li
                    className="category-link"
                    key={category}
                    onClick={()=>setCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
            <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider 
                    value={ratings}
                    onChange={(e, newRating)=>{setRatings(newRating)}}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                />
            </fieldset>

        </div>
            {loading?<Loader />:(
                    <div className="products">
                       {product && product.map(item=>(
                           <ProductCard product={item} />
                       ))}
                    </div>
            )}
                    {resultPerPage<count&&(
                        <div className="paginatiaonBox">
                        <Paginaiton
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                        />
                    </div>
                    )}
                    
        </Fragment>
    )
}

export default Products
