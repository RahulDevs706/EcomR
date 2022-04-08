import React, {Fragment, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts, clearError, deleteProduct } from '../../../actions/productAction';
import { Link } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import { Edit, Delete } from '@mui/icons-material';
import Sidebar from '../Sidebar';
import "./productsList.css"
import Loader from '../../layout/Loader/Loader';


const ProductsList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, loading, product} = useSelector(state=>state.products)

    const {error:deletionError, deleted} = useSelector(state=>state.updateProduct);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }

        if(deletionError){
            alert.error(error);
            dispatch(clearError());
        }

        if(deleted){
            alert.success("Product deleted successfully");
        }

        dispatch(getAdminProducts())
    }, [error, alert, dispatch, deleted, deletionError]);

    const handleDeletion = (e, id)=>{
        e.preventDefault();

        dispatch(deleteProduct(id));
    }

    const columns = [
        {
            field:"id",
            headerName:"Product Id",
            minWidth: 300,
            flex:1
        },
        {
            field:"name",
            headerName:"Name",
            minWidth: 350,
            flex:1,
        },
        {
            field:"stock",
            headerName:"Stock",
            minWidth: 150,
            flex:0.3,
            type:"number"
        },
        {
            field:"price",
            headerName:"Price",
            minWidth: 270,
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
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`} >
                            <Edit />
                        </Link>

                        <Button onClick={(e)=>handleDeletion(e, params.getValue(params.id, "id"))}><Delete /></Button>
                    </Fragment>
                )
            }
        }
    ]

    const rows = [];

    product && product.forEach(item => {
        rows.push({
            id:item._id,
            name:item.name,
            stock:item.stock,
            price:item.price
        })
    });

  return <Fragment>
    <MetaData title="All Products --Admin" />

    {loading?<Loader />:
    <div className='dashboard'>
        <Sidebar />
        <div className='productsListContainer'>
            <h1 id='productsListHeading'>
                ALL PRODUCTS
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
    }

  </Fragment>;
};

export default ProductsList;
