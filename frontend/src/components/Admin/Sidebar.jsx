import React from 'react';
import './sidebar.css'
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@material-ui/lab';
import { ExpandMore, PostAdd, Add, ImportExport, ListAlt, Dashboard, People, RateReview } from '@mui/icons-material';

const Sidebar = () => {
  return <div className='sidebar'>
    <Link to="/">
        <img src={logo} alt='company logo' />
    </Link>
    <Link to="/admin/dashboard">
        <p>
            <Dashboard /> Dashboard
        </p>
    </Link>

    <Link to="#">
        <TreeView 
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}
        >

            <TreeItem nodeId='1' label="Products" className="treeItem">
                <Link to="/admin/products">
                    <TreeItem nodeId='2' label="All" className="treeItemSub" icon={<PostAdd />} />
                </Link>

                <Link to="/admin/product">
                    <TreeItem nodeId='3' label="Create" className="treeItemSub" icon={<Add />} />
                </Link>
                
            </TreeItem>

        </TreeView>
    </Link>

    <Link to="/admin/order">
        <p>
            <ListAlt />
            Orders
        </p>
    </Link>

    <Link to="/admin/users">
        <p>
            <People />
            Users
        </p>
    </Link>

    <Link to="/admin/reviews">
        <p>
            <RateReview />
            Reviews
        </p>
    </Link>

        
  </div>;
};

export default Sidebar;
