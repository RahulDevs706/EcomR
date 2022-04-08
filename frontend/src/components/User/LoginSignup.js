import React, { Fragment, useEffect, useRef, useState } from 'react'
import "./LoginSignup.css"
import Loader from "../layout/Loader/Loader.js"
import { Link } from 'react-router-dom'

import {MailOutline, LockOpen, Face} from "@mui/icons-material"

import {useDispatch, useSelector} from "react-redux"
import { clearError, login, register } from '../../actions/userActions'
import {useAlert} from "react-alert";
import profileImg from "../../images/Profile.png"


const LoginSignup = ({history, location}) => {

    const {error, loading, isAuthenticated} = useSelector(state => state.user);

    const loginTab = useRef(null);
    const signupTab = useRef(null);
    const switcherTab = useRef(null);

    const dispatch = useDispatch();
    const alert = useAlert();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
    });

    const {name, email, password} = user;

    const [avatar, setAvatar] = useState(profileImg);
    const [avatarPreview, setAvatarPreview] = useState(profileImg);

    const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const signupSubmit = (e)=>{
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        
        dispatch(register(myForm));
    }

    const signupDataChange = (e)=>{
        const {name, value, files} = e.target;

        if(name === "avatar"){
            const reader = new FileReader();

            reader.onload = ()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(files[0])

        }else{
            setUser({...user, [name]:value})
        }
    }

    const redirect = location.search? location.search.split("=")[1] : "/account"

    useEffect(() => {
       if(error){
           alert.error(error);
           dispatch(clearError());
       }

       if(isAuthenticated){
           history.push(redirect);
       }

    }, [dispatch, error, alert, isAuthenticated, history, redirect]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          signupTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "signup") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          signupTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
      };

    return (
        <Fragment>
            {loading?<Loader />:
                <Fragment>
            <div className="loginSignupContainer">
                <div className="loginSignupBox">
                    <div>
                        <div className="login_signup_toggle">
                            <p onClick={(e)=>switchTabs(e, "login")}>Login</p>
                            <p onClick={(e)=>switchTabs(e, "signup")}>Signup</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>

                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutline />
                        <input 
                            type="email"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={e=>setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="loginPassword">
                        <LockOpen />
                        <input 
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={e=>setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/forget">Forget Password?</Link>
                    <input 
                        type="submit"
                        value="Login"
                        className="loginBtn"
                    />
                </form>
                <form
                    className="signupForm"
                    ref={signupTab}
                    encType="multipart/form-data"
                    onSubmit={signupSubmit}
                >
                <div className="signupName">
                    <Face />
                    <input 
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={signupDataChange}
                    />
                </div>
                <div className="signupEmail">
                        <MailOutline />
                        <input 
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={signupDataChange}
                        />
                    </div>
                    <div className="signupPassword">
                        <LockOpen />
                        <input 
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={password}
                            onChange={signupDataChange}
                        />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input 
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={signupDataChange}
                        />
                    </div>
                    <input 
                        type="submit"
                        value="Signup"
                        className="signupBtn"
                        disabled={loading? true: false}
                    />

                </form>

                </div>
            </div>
        </Fragment>

    }
</Fragment>

    )
}

export default LoginSignup

