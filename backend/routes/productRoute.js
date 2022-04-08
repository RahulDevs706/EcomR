const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createReview, getAllReviews, deleteReview, getAdminProducts  } = require('../controller/productController');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const router = express.Router()


// Normal User Routes
router.route('/products')
    .get(getAllProducts)

router.route('/admin/products').get(isAuthenticated, authorizedRoles("admin"), getAdminProducts);

router.route('/product/:id').get(getProductDetails)

// ADMIN Routes 
router.route('/admin/products/new')
    .post(isAuthenticated,authorizedRoles("admin"), createProduct)

router.route('/admin/product/:id')
    .put(isAuthenticated,authorizedRoles("admin"), updateProduct)
    .delete(isAuthenticated,authorizedRoles("admin"), deleteProduct)

router.route('/review/new').put(isAuthenticated, createReview);

router.route('/reviews').get(getAllReviews).delete(isAuthenticated, deleteReview)

module.exports = router;