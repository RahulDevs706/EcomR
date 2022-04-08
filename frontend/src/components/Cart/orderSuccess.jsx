import React from 'react';
import { CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import './orderSuccess.css'



const orderSuccess = () => {
  return (
    <div className='orderSuccess'>
      <CheckCircle />

      <Typography>Your Order has been place successfully.</Typography>
      <Link to="/profile/orders">View orders</Link>
    </div>);
};

export default orderSuccess;
