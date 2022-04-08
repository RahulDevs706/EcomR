import React, { Fragment, useEffect } from 'react';
import {DataGrid} from "@mui/x-data-grid"
import { useSelector, useDispatch } from 'react-redux';
import { myOrders, clearError } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { Launch } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';


import "./myOrders.css"


const MyOrders = () => {

    const dispatch = useDispatch()
    const alert = useAlert();

    const {user} = useSelector(state=>state.user);
    const {loading, error, orders} =  useSelector(state=>state.myOrders);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(myOrders());
    }, [error, alert, dispatch]);

    const columns=[
        {
            field:"id",
            headerName:"Order Id",
            minWidth: 300,
            flex:1
        },
        {
            field:"status",
            headerName:"Status",
            minWidth: 150,
            flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
            }
        },
        {
            field:"itmQty",
            headerName:"Items quantity",
            minWidth: 150,
            flex:0.3,
            type:"number"
        },
        {
            field:"amount",
            headerName:"Amount",
            minWidth: 150,
            flex:0.5,
            type:"number"
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
                    <Link to={`/order/${params.getValue(params.id, "id")}`} >
                        <Launch />
                    </Link>
                )
            }
        }
    ];
    const rows=[];
    
    orders && orders.forEach(item => {
        rows.push({
            id:item._id,
            status:item.orderStatus,
            itmQty:item.orderItems.length,
            amount:`₹${item.totalPrice}`
        })
    });


  return <Fragment>
    <MetaData title={`${user.name} - order`} />

    {loading?<Loader /> : (
        <div className='myOrdersPage'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='myOrdersTable'
                autoHeight
            />

            <Typography id="myOrdersHeading" >{`${user.name}'s Orders`}</Typography>

        </div>
    )}

  </Fragment>;
};

export default MyOrders;
