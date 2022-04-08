import React, { Fragment, useEffect } from 'react'
import {useSelector} from 'react-redux'
import MetaData from '../layout/MetaData'
import {Link} from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import './profile.css'


const Profile = ({history}) => {
    const {user, loading, isAuthenticated } = useSelector(state => state.user);
    

    useEffect(() => {
        if(isAuthenticated===false){
            history.push("/login");
        }
    }, [isAuthenticated, history])

    return (
        <Fragment>
           {loading?(<Loader />):
           ( <Fragment>
                <MetaData title={`${user.name}'s profile`}  />
                <div className='profileContainer'>
                    <div>
                        <h1>My Profile</h1>
                        <img src={user.avatar?.url} alt={user.name} />
                        <Link to={'/profile/update'}> Edit Profile </Link>
                    </div>
                    <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4>Joinned on</h4>
                            <p>{String(user.createdAt).substr(0, 10)}</p>
                        </div>
                        <div>
                            <Link to="/profile/orders">My orders</Link>
                            <Link to="/password/update">Change password</Link>
                        </div>
                        
                    </div>
                </div>
            </Fragment>)
           }
        </Fragment>
    )
}

export default Profile
