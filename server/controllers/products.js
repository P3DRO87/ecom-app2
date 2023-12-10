const { response } = require("express");
const Product = require("../models/Product");

const VALID_CATEGORIES = ["all", "kid", "men", "women", "unisex"];

const getProducts = async (req, res = response) => {
   const { category } = req.query;

   let condition = {};

   if (category !== "all" && VALID_CATEGORIES.includes(category)) {
      condition = { category };
   }

   try {
      const products = await Product.find(condition)
         .select("title images price inStock slug sizes type -_id")
         .lean();

      res.json({ products });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const getProductBySlug = async (req, res = response) => {
   const { slug } = req.params;

   if (slug === "search") return searchProduct(req, res);

   try {
      const product = await Product.findOne({ slug }).lean();

      if (!product) {
         return res.status(404).json({ msg: "Product not found" });
      }

      return res.json({ product });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const searchProduct = async (req, res = response) => {
   const { query } = req.query;

   try {
      if (!query) return res.status(400).json({ msg: "Missing query param" });

      const products = await Product.find({ $text: { $search: query } }).lean();

      res.json({ products });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

module.exports = { getProducts, getProductBySlug, searchProduct };
