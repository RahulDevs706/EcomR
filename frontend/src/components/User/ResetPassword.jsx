import React, { Fragment, useEffect, useState } from 'react'
import "./updatePassword.css"
import Loader from "../layout/Loader/Loader.js"
import MetaData from '../layout/MetaData'

import {LockOpen, Lock} from "@mui/icons-material"

import {useDispatch, useSelector} from "react-redux"
import { clearError, resetPassword } from '../../actions/userActions'
import {useAlert} from "react-alert";



const ResetPassword = ({history, match}) => {
    const {error, success, loading} = useSelector(state => state.forgotPassword);
    const dispatch = useDispatch();
    const alert = useAlert();

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const{token} = match.params; 


    const resetPasswordSubmit = (e)=>{
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
       
        
        dispatch(resetPassword(myForm, token));
    }


    useEffect(() => {
   
       if(error){
           alert.error(error);
           dispatch(clearError());
       }

       if(success){
           alert.success("Password changed successfuly");

           history.push('/login');
       }
    }, [dispatch, error, alert, success, history]);



    return (
       <Fragment>
           {loading?(<Loader />):(
            <Fragment>
                <MetaData title="Reset Password" />
                <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                <h2>Reset Password </h2>

                <form
                    className="updatePasswordForm"
                    onSubmit={resetPasswordSubmit}
                >
               
                    <div className="signupPassword">
                        <LockOpen />
                        <input 
                            type="password"
                            placeholder="New Password"
                            required
                            name="password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
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

export default ResetPassword
