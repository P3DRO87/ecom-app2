const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
   {
      description: {
         type: String,
         required: true,
      },

      images: [{ type: String }],

      inStock: { type: Number, required: true, default: 0 },

      price: { type: Number, required: true },

      sizes: [
         {
            type: String,
            enum: {
               values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
               message: "{VALUE} is not a valid size",
            },
         },
      ],

      slug: { type: String, required: true, unique: true },

      tags: [{ type: String }],

      title: { type: String, required: true },

      type: {
         type: String,
         enum: {
            values: [
               "shirts",
               "pants",
               "hoodies",
               "hats",
               "camisas",
               "pantalones",
               "sueteres",
               "prendas",
            ],
            message: "{VALUE} is not a valid type",
         },
      },

      category: {
         type: String,
         enum: {
            values: ["men", "women", "kid", "unisex"],
            message: "{VALUE} is not a valid category",
         },
         required: true,
      },
   },
   { timestamps: true }
);

ProductSchema.index({ title: "text", tags: "text" });

module.exports = model("products", ProductSchema);
