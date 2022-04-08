import { Button } from '@material-ui/core';
import { Delete, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearError, deleteUser, getAllUsers } from '../../../actions/userActions';
import { DELETE_USER_RESET } from '../../../constants/userConstants';
import Loader from '../../layout/Loader/Loader';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';

const UsersList = () => {
    const dispatch = useDispatch();
    const {loading, error, users} = useSelector(state=>state.allUsers);
    const {error:deletionError, isDeleted} = useSelector(state=>state.userStats);

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
            alert.success("User deleted successfully");
            dispatch({type:DELETE_USER_RESET});
        }

       dispatch(getAllUsers());
    }, [error, alert, dispatch, deletionError, isDeleted]);

    const handleDeletion = (e, id)=>{
        dispatch(deleteUser(id))
    }
    
    const columns=[
        {
            field:"id",
            headerName:"User Id",
            minWidth: 180,
            flex:0.8
        },
        {
            field:"email",
            headerName:"Email",
            minWidth: 200,
            flex:1,
        },
        {
            field:"name",
            headerName:"Name",
            minWidth: 150,
            flex:0.5,
        },

        {
            field:"role",
            headerName:"Role",
            minWidth: 150,
            flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
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
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`} >
                            <Edit />
                        </Link>

                        <Button onClick={(e)=>handleDeletion(e, params.getValue(params.id, "id"))}><Delete /></Button>
                    </Fragment>
                )
            }
        }
    ];
    
    const rows = [];

    users && users.forEach(item => {
        rows.push({
            id:item._id,
            name:item.name,
            email:item.email,
            role:item.role
        })
    });

  return <Fragment>
    <MetaData title="All Users --Admin Panel" />
    {loading? <Loader />:(
        <div className='dashboard'>
            <Sidebar />
            <div className='productsListContainer'>
                <h1 id='productsListHeading'>
                     ADMIN PANEL <br /> ALL USERS  
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


export default UsersList;
