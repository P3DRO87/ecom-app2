const { response } = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

const getAdminInfo = async (req, res = response) => {
   try {
      const adminUser = await User.findById(req._id);

      if (adminUser.role !== "admin") {
         return res.status(401).json({ msg: "Unauthorized" });
      }

      const [orders, clients, products] = await Promise.all([
         Order.find(),
         User.find(),
         Product.find(),
      ]);

      const LOW_STOCK = 10;

      res.json({
         numberOfOrders: orders.length,
         paidOrders: orders.filter(({ isPaid }) => isPaid).length,
         notPaidOrders: orders.filter(({ isPaid }) => !isPaid).length,
         numberOfclients: clients.filter(({ role }) => role === "client").length,
         numberOfProducts: products.length,
         noStockProducts: products.filter(({ inStock }) => inStock === 0).length,
         lowStockProducts: products.filter(({ inStock }) => inStock <= LOW_STOCK).length,
      });
   } catch (error) {}
};

module.exports = { getAdminInfo };
