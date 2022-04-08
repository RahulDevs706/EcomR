import React, { Fragment, useEffect } from 'react';
import Sidebar from "./Sidebar.jsx"
import "./dashboard.css"
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {Chart as ChartJS} from 'chart.js/auto';
import {Doughnut, Line} from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction.js';
import { allOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userActions.js';



const Dashboard = () => {

    const dispatch = useDispatch();
    const { product} = useSelector(state=>state.products);
    const { orders} = useSelector(state=>state.allOrders)
    const { users} = useSelector(state=>state.allUsers)

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders());
        dispatch(getAllUsers());
    }, [dispatch]);


    var outOfStock = 0;

    product && product.forEach(item=>{
        if(item.stock === 0){
            outOfStock += 1;
        }
    })

    let totalAmount = 0;

    orders&& 
        orders.forEach(item=>{
        totalAmount += item.totalPrice;
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
    };

    const doughnutState = {
        labels: ["Out of stock", " In stock"],
        datasets:[{
            backgroundColor:['#00A6B4', '#6800B4'],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data:[outOfStock, product?.length - outOfStock]    
        }]

    }

  return <Fragment>
        <div className='dashboard'>
            <Sidebar />

            <div className='dashboardContainer'>
                <Typography component="h1"> Dashborad</Typography>
                <div className='dashboardSummary'>
                    <div>
                        <p>
                            Total amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to='/admin/products'>
                            <p>Product</p>
                            <p> {product && product.length} </p>
                        </Link>

                        <Link to='/admin/order'>
                            <p>Orders</p>
                            <p> {orders?.length} </p>
                        </Link>

                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p> {users?.length} </p>
                        </Link>

                    </div>
                </div>

                <div className='lineChart'>
                    <Line data={lineState} />
                </div>

                <div className='doughnutChart'>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
  </Fragment>
 ;
};

export default Dashboard;
