import { Button } from '@material-ui/core';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allOrders, clearError, deleteOrder } from '../../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../../constants/orderConstant';
import Loader from '../../layout/Loader/Loader';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';

const OrderList = () => {
    const dispatch = useDispatch();
    const {loading, error, orders} = useSelector(state=>state.allOrders);
    const {error:deletionError, isDeleted} = useSelector(state=>state.orderStats);

    const alert = useAlert();

    useEffect(() => {
       if(error){
           alert.error(error);
           dispatch(clearError());
       }

       if(deletionError){
        alert.error(deletionError);
        dispatch(clearError());
        }

        if(isDeleted){
            alert.success("Order deleted successfully");
            dispatch({type:DELETE_ORDER_RESET});
        }

       dispatch(allOrders());
    }, [error, alert, dispatch, deletionError, isDeleted]);

    const handleDeletion = (e,id)=>{
        dispatch(deleteOrder(id))
    }
    
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
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`} >
                            <Edit />
                        </Link>

                        <Button onClick={(e)=>handleDeletion(e, params.getValue(params.id, "id"))}><Delete /></Button>
                    </Fragment>
                )
            }
        }
    ];
    
    const rows = [];

    orders && orders.forEach(item => {
        rows.push({
            id:item._id,
            status:item.orderStatus,
            itmQty:item.orderItems.length,
            amount:`₹${item.totalPrice}`
        })
    });

  return <Fragment>
    <MetaData title="All Orders --Admin Panel" />
    {loading? <Loader />:(
        <div className='dashboard'>
            <Sidebar />
            <div className='productsListContainer'>
                <h1 id='productsListHeading'>
                     ADMIN PANEL <br /> ALL ORDERS  
                </h1>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productsListTable'
                    autoHeight
                />
            </div>
        </div>
    )}
  </Fragment>;
};

export default OrderList;
