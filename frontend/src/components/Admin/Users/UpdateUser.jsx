import {  Face, MailOutline, VerifiedUser } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar';
import { UPDATE_USER_RESET } from '../../../constants/userConstants';
import { clearError, getSingleUser, updateUser } from '../../../actions/userActions';
import { useParams } from 'react-router-dom';
import Loader from '../../layout/Loader/Loader';

const UpdateUser = ({history}) => {


  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const userId = params.id;

  const {loading, error, user} = useSelector(state=>state.userDetails);
  const { error:updateError, isUpdated} = useSelector(state=>state.userStats);

  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [role, setRole] = useState("");


  useEffect(() => {

    if(user && user._id !== userId){
        dispatch(getSingleUser(userId));
    }else{
        setName(user?.name);
        setEmail(user?.email);
        setRole(user?.role);
    }

    if(error){
      alert.error(error);
      dispatch(clearError());
    }

    if(updateError){
        alert.error(updateError);
        dispatch(clearError());
      }

    if(isUpdated){
      alert.success("User updated successfully");
      history.push("/admin/users")
      dispatch({
        type:UPDATE_USER_RESET
      })
    }
  }, [alert, error, isUpdated, updateError, dispatch, history, user, userId]);



  const handleUpdateSubmit = (e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);



    dispatch(updateUser(myForm, userId));
  }

  
  return <Fragment>
    <MetaData title="Update User --ADMIN PANEL" />
    <div className='dashboard'>
      <Sidebar />
      {loading?<Loader />:
      (
        <div className='createProductContainer'>
            <form 
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={handleUpdateSubmit}
            >
                <h1>Update User</h1>

            <div>
                <Face />
                <input 
                type="text"
                required
                value={name}
                onChange={e=>setName(e.target.value)}
                />
          </div>

          <div>
            <MailOutline />
            <input 
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <VerifiedUser />
            <select value={role} onChange={e=>setRole(e.target.value)}>
              <option value="">Choose Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>

            </select>
          </div>


          <button
            id='createProductBtn'
            type='submit'
            disabled={loading? true:false || role===""? true:false}
          >
            Update user
          </button>


            </form>
        </div>

      )
      }
    </div>
  </Fragment>;
};


export default UpdateUser