import React, { Fragment, useEffect, useState } from 'react'
import "./updatePassword.css"
import Loader from "../layout/Loader/Loader.js"
import MetaData from '../layout/MetaData'

import {LockOpen, VpnKey, Lock} from "@mui/icons-material"

import {useDispatch, useSelector} from "react-redux"
import { clearError, updatePassword } from '../../actions/userActions'
import {useAlert} from "react-alert";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'


const UpdatePassword = ({history}) => {

    const {error, isUpdated, loading} = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const alert = useAlert();

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const updatePasswordSubmit = (e)=>{
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
       
        
        dispatch(updatePassword(myForm));
    }


    useEffect(() => {
   
       if(error){
           alert.error(error);
           dispatch(clearError());
       }

       if(isUpdated){
           alert.success("Password changed successfuly");

           history.push('/account');
           dispatch({
               type:UPDATE_PASSWORD_RESET
           })
       }
    }, [dispatch, error, alert, isUpdated, history]);



    return (
       <Fragment>
           {loading?(<Loader />):(
            <Fragment>
                <MetaData title="Update Password" />
                <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                <h2>Update Profile </h2>

                <form
                    className="updatePasswordForm"
                    encType="multipart/form-data"
                    onSubmit={updatePasswordSubmit}
                >
               
                    <div className="signupPassword">
                        <VpnKey />
                        <input 
                            type="password"
                            placeholder="Old Password"
                            required
                            name="oldPassword"
                            value={oldPassword}
                            onChange={(e)=>{setOldPassword(e.target.value)}}
                        />
                     </div>
                    <div className="signupPassword">
                        <LockOpen />
                        <input 
                            type="password"
                            placeholder="New Password"
                            required
                            name="newPassword"
                            value={newPassword}
                            onChange={(e)=>{setNewPassword(e.target.value)}}
                        />
                     </div>
                    <div className="signupPassword">
                        <Lock />   
                        <input 
                            type="password"
                            placeholder="Confirm Password"
                            required
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        />    
                    </div>
                    <input 
                        type="submit"
                        value="Change"
                        className="updatePasswordBtn"
                    />

                </form>
                </div>
                </div>
            </Fragment>
            )
           }
       </Fragment>
    )
}

export default UpdatePassword
