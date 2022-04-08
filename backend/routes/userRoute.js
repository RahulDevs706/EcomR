const express = require('express');
const router = express.Router()

const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, singleUserDetail, updateSingleUser, deleteUser} = require('../controller/userController');
const {isAuthenticated, authorizedRoles} = require('../middleware/auth')

//  Normal User Auth route
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route('/logout').get(logout)

// Normal User Update Routes
router.route('/profile').get(isAuthenticated ,getUserDetails)
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route('/profile/update').put(isAuthenticated ,updateProfile)

//  --ADMIN Routes
router.route('/admin/users').get(isAuthenticated, authorizedRoles("admin"), getAllUsers)

router.route('/admin/user/:id')
    .get(isAuthenticated, authorizedRoles("admin"), singleUserDetail)
    .put(isAuthenticated, authorizedRoles("admin"), updateSingleUser)
    .delete(isAuthenticated, authorizedRoles("admin"), deleteUser)


module.exports = router;