const { response, request } = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { isValidObjectId } = require("mongoose");
const axios = require("axios");
const Stripe = require("stripe");

const { STRIPE_SECRET_KEY } = process.env;

const createOrder = async (req = request, res = response) => {
   if (!req.body.order) return res.status(400).json({ msg: "Invalid order" });

   const { orderItems, total } = req.body.order;

   try {
      const productsIds = orderItems.map((product) => product._id);

      const productsDB = await Product.find({ _id: { $in: productsIds } });

      const indexedProductsDB = productsDB.reduce(
         (acc, product) => ({ ...acc, [product._id]: product }),
         {}
      );

      for (const productId of productsIds) {
         if (!(productId in indexedProductsDB)) {
            return res.status(400).json({ msg: "Invalid product" });
         }
      }

      const subTotal = orderItems.reduce(
         (acc, { price, quantity }) => price * quantity + acc,
         0
      );

      const IVA_PERCENT = 15;
      const tax = (subTotal * IVA_PERCENT) / 100;

      const serverTotal = tax + subTotal;

      if (total !== serverTotal) {
         return res.status(400).json({ msg: "The total price has been manipulated" });
      }

      const { _id: user } = req;

      const order = new Order({ ...req.body.order, isPaid: false, user });

      order.total = Number(order.total.toFixed(2));

      await order.save();

      res.status(201).json({ order });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const checkOrder = async (req = request, res = response) => {
   const { id } = req.body;

   if (!isValidObjectId(id)) return res.status(400).json({ msg: "Invalid order" });

   try {
      const order = await Order.findById(id).lean();

      if (!order) return res.status(400).json({ msg: "Invalid user" });

      res.json({ order: JSON.parse(JSON.stringify(order)) });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const getUserOrders = async (req = request, res = response) => {
   const { _id } = req;

   try {
      const userOrders = await Order.find({ user: _id });

      res.json({ orders: userOrders });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const stripe = new Stripe(STRIPE_SECRET_KEY);

const payOrder = async (req = request, res = response) => {
   const { id, amount, orderId } = req.body;

   const parsedAmount = Number((amount.toFixed(2) * 100).toFixed(2));

   try {
      if (!id) return res.status(400).json({ msg: "Payment id required" });

      if (!amount) return res.status(402).json({ msg: "Payment required" });

      const orderDB = await Order.findById(orderId);

      if (!orderDB) return res.status(400).json({ msg: "Invalid order" });

      const paymentConfig = { amount: parsedAmount, currency: "NIO", payment_method: id };

      const stripeRes = await stripe.paymentIntents.create({
         ...paymentConfig,
         automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never",
         },
      });

      orderDB.transactionId = stripeRes.id;
      orderDB.isPaid = true;

      await orderDB.save();

      res.json({ msg: "Order payed successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

module.exports = { createOrder, checkOrder, getUserOrders, payOrder };
