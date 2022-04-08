const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail.js')
const crypto = require('crypto');
const cloudinary = require('cloudinary');


exports.registerUser=catchAsyncError( async(req, res, next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width:150,
        crop:"scale"
    });

    const {name, email, password, role} = req.body;

    const user = await User.create({
        name, 
        email, 
        password,
        role,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });
    sendToken(user, 201, res)

});

exports.loginUser= catchAsyncError( async(req, res, next)=>{
    const {email, password}= req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    
    if(!user){
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    sendToken(user, 200, res)

})

exports.logout = catchAsyncError( async(req, res, next)=>{

    res.cookie('token', null, {
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Successfuly logged out"
    })
});

exports.forgotPassword = catchAsyncError(async(req, res, next)=>{
    const {email} = req.body
    const foundUser = await User.findOne({email:email})

    if(!foundUser){
        return next(new ErrorHandler('User not found', 404));
    }

    // get Reset PasswordToken
   const resetToken = await foundUser.getPasswordResetToken();

   await foundUser.save({validateBeforeSave:false});

   const resetPasswordLink = `${req.protocol}://${req.get("host")}/user/password/reset/${resetToken}`;

   const message = `Your password reset token is :- \n\n ${resetPasswordLink} \n\n If you have not requested this email then, please ignore this email`

   try {
       await sendEmail({
        email:foundUser.email,
        subject:"Ecom-R Password Recovery",
        message
       });

       res.status(200).json({
           success:true,
           message:`Email sent to ${foundUser.email} successfuly`
       })
   } catch (error) {
        foundUser.resetPasswordToken= undefined;
        foundUser.resetPasswordExpire = undefined;

       await foundUser.save({validateBeforeSave:false});

       next(new ErrorHandler(error.message, 500))
   }

})

exports.resetPassword = catchAsyncError(async (req, res, next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex');

    const foundUser = await User.findOne(
        {
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        }
    );

    if(!foundUser){
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400))
    };

    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("New password and confirm password does not match", 400))
    }

    foundUser.password = req.body.password;
    foundUser.resetPasswordToken = undefined;
    foundUser.resetPasswordExpire = undefined;

    await foundUser.save();

    sendToken(foundUser, 200, res)
})

// get user details

exports.getUserDetails = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})
// update password
exports.updatePassword = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
       return next(new ErrorHandler("old password is incorrect", 401));
    }

    if(req.body.oldPassword === req.body.newPassword){
        return next(new ErrorHandler("Old password and new password is matching please choose something different", 401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match", 401));
    }

    user.password = req.body.newPassword;

    await user.save();

   sendToken(user, 200, res)
})

// update profile
exports.updateProfile = catchAsyncError(async (req,res,next)=>{

    const newData = {
        name:req.body.name,
        email:req.body.email
    }

    if(req.body.avatar !==""){
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width:150,
            crop:"scale"
        });

        newData.avatar={
            public_id: myCloud.public_id,
            url:myCloud.secure_url
        }
    
    }

    await User.findByIdAndUpdate(req.user.id, newData, {
     new:true,
     runValidators:true,
     useFindAndModify:false
 })

    res.status(200).json({
        success:true,
    })
})

// get all users  --ADMIN
exports.getAllUsers = catchAsyncError(async (req,res,next)=>{

    const allUser = await User.find()

    res.status(200).json({
        success:true,
        allUser
    })

})

// get single user  --ADMIN

exports.singleUserDetail = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`, 404));
    }

    res.status(200).json({
        success:true,
        user
    })

})

// update single user --ADMIN
exports.updateSingleUser = catchAsyncError(async (req,res,next)=>{

    const newData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
   
    await User.findByIdAndUpdate(req.params.id, newData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
   
    res.status(200).json({
           success:true,
    })
})

// delete profile --ADMIN
exports.deleteUser = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`, 404));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();
   
    res.status(200).json({
        success:true,
        message:`User deleted successfuly`
    })
   })