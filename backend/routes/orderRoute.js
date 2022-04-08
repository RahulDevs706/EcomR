const express = require('express');
const { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controller/orderController');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const router = express.Router()

router.route("/order/new").post(isAuthenticated, newOrder );

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router.route("/orders/my").get(isAuthenticated, myOrder);

router.route('/admin/orders').get(isAuthenticated, authorizedRoles("admin"), getAllOrders)

router.route('/admin/order/:id')
    .put(isAuthenticated, authorizedRoles("admin"), updateOrderStatus)
    .delete(isAuthenticated, authorizedRoles("admin"), deleteOrder)

module.exports = router;