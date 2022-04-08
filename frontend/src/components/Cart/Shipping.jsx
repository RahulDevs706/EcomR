import React, {Fragment, useState} from 'react';
import './shipping.css'
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { saveShippingInfo } from '../../actions/cartAction';

import {Home, PinDrop, LocationCity, Public, Phone, TransferWithinAStation} from "@mui/icons-material"
import {Country, State} from "country-state-city"
import { useAlert } from 'react-alert';

import CheckOutSteps from "./CheckoutSteps.jsx"


const Shipping = ({history}) => {

    const dispatch = useDispatch();
    const {shippingInfo} = useSelector(state=>state.cart);
    const alert = useAlert();

    const [shippingData, setShippingData] = useState({
        address:shippingInfo.address,
        city:shippingInfo.city,
        state:shippingInfo.state,
        country:shippingInfo.country,
        pincode:shippingInfo.pincode,
        phoneNo:shippingInfo.phoneNo
    })

    const shippingSubmit = (e)=>{
        e.preventDefault();
        if(shippingData.phoneNo<10){
            alert.error("Phone no. must be of 10 digits");
            return;
        }

        dispatch(saveShippingInfo(shippingData));

        history.push('/order/confirm')
    }

    const handleShippingChange = (e)=>{
        const {name, value} = e.target;

        setShippingData({...shippingData, [name]:value});
    }

  return <Fragment>
        <MetaData title="Shipping details" />
        <CheckOutSteps activeStep={0} />
        <div className='shippingContainer'>
            <div className='shippingBox'>
                <h2 className='shippingHeading'>Shipping Details</h2>

                <form 
                    className='shippingForm'
                    encType='multipart/form-data'
                    onSubmit={shippingSubmit}
                >

                    <div>
                        <Home />
                        <input 
                            type="text"
                            placeholder="Address"
                            required
                            value={shippingData.address}
                            name='address'
                            onChange={handleShippingChange}
                        />
                    </div>

                    <div>
                        <LocationCity />
                        <input 
                            type="text"
                            placeholder="City"
                            required
                            value={shippingData.city}
                            name='city'
                            onChange={handleShippingChange}
                        />
                    </div>

                    <div>
                        <Public />
                        <select
                            required
                            value={shippingData.country}
                            name="country"
                            onChange={handleShippingChange}
                        >
                            <option value="">Country</option>
                            {
                                Country&& Country.getAllCountries().map(item=>(
                                    <option key={item.isoCode} value={item.isoCode} > {item.name} </option>
                                ))
                            }
                        </select>
                    </div>

                    {shippingData.country  &&
                    (
                        <div>
                            <TransferWithinAStation />
                            <select
                            required
                                value={shippingData.state}
                                name="state"
                                onChange={handleShippingChange} 
                            >
                                <option value="">State</option>
                                {
                                    State && State.getStatesOfCountry(shippingData.country).map(item=>(
                                        <option key={item.isoCode} value={item.isoCode}> {item.name} </option>
                                    ))
                                }
                            </select>
                        </div>
                    )
                    }

                    <div>
                        <PinDrop />
                        <input 
                            type="number"
                            placeholder="Pin code"
                            required
                            value={shippingData.pincode}
                            name='pincode'
                            onChange={handleShippingChange}
                        />
                    </div>

                    <div>
                        <Phone />
                        <input 
                            type="number"
                            placeholder="Phone no."
                            required
                            value={shippingData.phoneNo}
                            name='phoneNo'
                            onChange={handleShippingChange}
                            size="10"
                        />
                    </div>

                    
                    <input 
                        type="submit"
                        value="Continue"
                        className="shippingBtn"
                        disabled={shippingData.state?false:true}
                    />

                </form>
            </div>

        </div>

  </Fragment>;
};

export default Shipping;
