import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// =====================
// PLACE ORDER USING STRIPE
// =====================
export const placeOrder = async (req, res) => {
  try {
    const frontend_url = process.env.FRONTEND_URL;

    // calculate amount on backend for security
    let amount = 0;

    req.body.items.forEach((item) => {
      amount += item.price * item.quantity;
    });

    if (amount > 0) {
      amount += 2; // delivery fee
    }

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: amount,
      address: req.body.address,
      payment: false,
    });

    await newOrder.save();

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    if (req.body.items.length > 0) {
      line_items.push({
        price_data: {
          currency: "pkr",
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: 2 * 100,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// =====================
// VERIFY ORDER
// =====================
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// =====================
// USER ORDERS
// =====================
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export const listOrders=async (req,res)=>{
  try{
    const orders=await orderModel.find({});
    res.json({success:true,data:orders});
  }catch(error){
    res.json({success:false,message:"Error"});
  }
}
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Order status updated"
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error updating status"
    });
  }
};