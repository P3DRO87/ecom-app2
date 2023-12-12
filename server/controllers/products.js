const { response } = require("express");
const Product = require("../models/Product");
const { isValidObjectId } = require("mongoose");

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

const createProduct = async (req, res = response) => {
   const { _id = "", images = [] } = req.body;

   if (images.length < 2) {
      return res.status(400).json({ msg: "At least 2 images are required" });
   }

   try {
      const productDB = await Product.findOne({
         $or: [{ slug: req.body.slug }, { title: req.body.title }],
      });

      if (productDB) {
         return res.status(400).json({ msg: "Already existing product (title or slug)" });
      }

      const product = new Product(req.body);

      await product.save();

      res.json(product);
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const updateProduct = async (req, res = response) => {
   const { _id = "", images = [] } = req.body;

   if (!isValidObjectId(_id)) return res.status(400).json({ msg: "Invalid mongo id" });

   if (images.length < 2) {
      return res.status(400).json({ msg: "At least 2 images are required" });
   }

   try {
      const productDB = await Product.findById(_id);

      if (!productDB) return res.status(400).json({ msg: "Invalid product" });

      const productRes = await Product.findByIdAndUpdate(_id, req.body, { new: true });

      res.json({ product: productRes });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const deleteProduct = async (req, res = response) => {
   const { _id = "" } = req.body;

   if (!isValidObjectId(_id)) return res.status(400).json({ msg: "Invalid mongo id" });

   try {
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

module.exports = {
   getProducts,
   getProductBySlug,
   searchProduct,
   createProduct,
   updateProduct,
};
