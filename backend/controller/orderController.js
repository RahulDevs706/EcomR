const Order = require('../models/ordersModel')

const Product = require('../models/productsModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');


// Create Order
exports.newOrder = catchAsyncError(async(req, res, next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user.id
    })

    res.status(200).json({
        success:true,
        order
    })
})

// get single Order
exports.getSingleOrder = catchAsyncError(async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order not found with the given id", 404));
    }

    res.status(200).json({
        success:true,
        order,
    })
})

// get Logedin user orders
exports.myOrder = catchAsyncError(async(req, res, next)=>{
    const orders = await Order.find({user:req.user.id})


    res.status(200).json({
        success:true,
        orders,
    })
})

// get all orders  --ADMIN
exports.getAllOrders = catchAsyncError(async(req, res, next)=>{
    const orders = await Order.find()

    let totalAmount=0;

    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})

// update order status  --ADMIN
exports.updateOrderStatus = catchAsyncError(async(req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order not found with the given id", 404));
    }


    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("This order has been already delivered", 400));
    }

    if(order.orderStatus === "Shipped"){
        order.orderItems.forEach( async (item)=>{
            await updateStock(item.product, item.quantity)
        })
    }


    if(req.body.status==="Delivered"){
        order.deliverdAt = Date.now();
    }

    order.orderStatus = req.body.status

    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        order,
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock -= quantity

    await product.save({validateBeforeSave:false})
}

// delete Order --ADMIN
exports.deleteOrder = catchAsyncError(async(req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order not found with the given id", 404));
    }

    await order.remove()

    res.status(200).json({
        success:true,
        order,
    })
})

