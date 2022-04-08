import React, { Fragment, useEffect, useState } from 'react'
import "./forgotPassword.css"
import Loader from "../layout/Loader/Loader.js"
import MetaData from '../layout/MetaData'

import {MailOutline} from "@mui/icons-material"

import {useDispatch, useSelector} from "react-redux"
import { clearError, forgotPassword } from '../../actions/userActions'
import {useAlert} from "react-alert";

const ForgotPassword = () => {

    const {error, message, loading} = useSelector(state => state.forgotPassword);
    const dispatch = useDispatch();
    const alert = useAlert();

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('email', email);

        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }

        if(message){
            alert.success(message);
        }
    }, [alert, dispatch, message, error]);

    return (
        <Fragment>
           {loading? (<Loader />):(
            <Fragment>
                <MetaData title="Forgot Password" />
                <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                <h2>Forgot Password </h2>

                <form
                    className="forgotPasswordForm"
                    onSubmit={forgotPasswordSubmit}
                >
                <div className="forgotPasswordEmail">
                        <MailOutline />
                        <input 
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    
                    <input 
                        type="submit"
                        value="Send"
                        className="forgotPasswordBtn"
                    />

                </form>
                </div>
                </div>
            </Fragment>
           )}
       </Fragment>
    )
}

export default ForgotPassword
