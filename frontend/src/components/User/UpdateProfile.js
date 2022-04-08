import React, { Fragment, useEffect, useState } from 'react'
import "./UpdateProfile.css"
import Loader from "../layout/Loader/Loader.js"
import MetaData from '../layout/MetaData'

import {MailOutline, Face} from "@mui/icons-material"

import {useDispatch, useSelector} from "react-redux"
import { clearError, loadUser, updateProfile } from '../../actions/userActions'
import {useAlert} from "react-alert";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'


const UpdateProfile = ({history}) => {

    const {user} = useSelector(state => state.user);
    const {error, isUpdated, loading} = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const alert = useAlert();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");



    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const updateProfileSubmit = (e)=>{
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e)=>{
        const {files} = e.target;

            const reader = new FileReader();

            reader.onload = ()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(files[0])
    }

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

       if(error){
           alert.error(error);
           dispatch(clearError());
       }

       if(isUpdated){
           alert.success("Profile updated successfuly");
           dispatch(loadUser());

           history.push('/account');
           dispatch({
               type:UPDATE_PROFILE_RESET
           })
       }
    }, [dispatch, error, alert, isUpdated, history, user]);


    return (
       <Fragment>
           {loading? (<Loader />):(
            <Fragment>
                <MetaData title="Update profile" />
                <div className="updateProfileContainer">
                <div className="updateProfileBox">
                <h2>Update Profile </h2>

                <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                >
                <div className="updateProfileName">
                    <Face />
                    <input 
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="updateProfileEmail">
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
                    
                    <div id="updateProfileImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input 
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={updateProfileDataChange}
                        />
                    </div>
                    <input 
                        type="submit"
                        value="Update profile"
                        className="updateProfileBtn"
                    />

                </form>
                </div>
                </div>
            </Fragment>
           )}
       </Fragment>
    )
}

export default UpdateProfile
