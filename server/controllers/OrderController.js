import ORDER from "../models/OrderModel.js";

export const createOrder  = async (req,res)=>{
    try {
        req.body.user = req.user.userId
        const {orderItems,recipientInfo,deliveryAddress,totalPrice,paymentRef} = req.body;
        if(!orderItems || !recipientInfo || !deliveryAddress || !totalPrice || !paymentRef){
            return res.status(400).json({success:false,errMsg:"all fields are required"})
        }
        if(!orderItems || orderItems === 0){
            return res.status(400).json({success:false,errMsg:"No ordered item(s) yet"})
        }
        if(!paymentRef){
            return res.status(400).json({success:false,errMsg:"payment reference is required"})
        }

        const order = await ORDER.create({...req.body,status:"paid"});
        res.status(201).json({success:true,message:"order created",order})
    } catch (error) {
      res.status(500).json(error.message)  
    }
}

// getting all orders
export const orders = async(req,res)=>{
    try {
        const orders = await ORDER.find({}).select("_id recipientInfo.fullName orderItems totalPrice status")
        if(orders.length < 1){
            return res.status(400).json({success:false,errMsg:"no order(s)yet"})
        }
        res.status(200).json({success:true,message:"all orders",orders})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// orders for customer with pagination
export const customerOrder = async (req,res)=>{
    const {userId} = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const totalOrders = await ORDER.countDocuments({user:userId});
        const orders = await ORDER.find({user:userId}).select("orderItems createdAt").sort({createdAt:-1}).skip(skip).limit(limit);
        if(!orders.length){
            return res.status(404).json({success:false,errMsg:"you have not created any order yet"})
        }
        res.status(200).json({success:true,message:"your order(s)" ,currentPage:page, totalPages: Math.ceil(totalOrders/limit),totalOrders,orders})
    } catch (error) {
        res.status(500).json(error.message)
    }
}
// orders for customer
// export const customerOrder = async (req,res)=>{
//     const {userId} = req.user;
//     try {
//         const orders = await ORDER.find({user:userId}).select("orderItems createdAt").sort({ createdAt: -1 })
//         if(orders.length < 1){
//             return res.status(400).json({success:false,errMsg:"you have not created any order yet"})
//         }

//         res.status(200).json({success:true,message:"your oder(s)", orders});
//     } catch (error) {
//         res.status(500).json(error.message)
//     }
// }