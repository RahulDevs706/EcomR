import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import "./Home.css"

import MetaData from '../layout/MetaData'
import Product from './ProductCard.js'
import {clearError, getAllProducts} from "../../actions/productAction"

import {useSelector, useDispatch} from "react-redux"
import Loader from '../layout/Loader/Loader'

import {useAlert} from "react-alert"

const Home = () => {
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const {error, loading, product, productsCount} = useSelector((state)=>state.products);
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(getAllProducts()) 
    }, [dispatch, error, alert])


    return (
        <>
        {loading?<Loader />:
                            <>
                                <MetaData title="Ecom-R" />
                            
                                <div className="banner">
                                    <p>Welcome to Ecom-R</p>
                                    <h1>FIND ALL YOUR BASIC NEEDS UNDER ONE ROOF</h1>
                                    
                                    <a href="#container">
                                        <button>
                                            scroll <CgMouse />
                                        </button>
                                    </a>
                                </div>
                                <h2 className="homeHeading"> Featured Product</h2>
                                <div className="container" id="container">
                                    {product?.map(item=>{
                                        return <Product product={item}/>
                                    })}
                                </div>

                            </>}
        </>
    )
}

export default Home
