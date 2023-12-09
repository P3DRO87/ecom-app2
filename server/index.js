const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dbConnection = require("./db/config");
const cors = require("cors");
const Product = require("./models/Product");
// const { nextApp, handle } = require("../client/server");

require("dotenv").config();

const { PORT = 3004, HOST = "localhost" } = process.env;

app.use(cors());
app.use(cookieParser());

app.use(express.json());

dbConnection();

const categories = ["men", "women"];

const types = ["shirts", "hoodies", "hats"];

const tagsType = {
   shirts: ["shirt"],
   hoodies: ["jacket", "sweatshirt", "hoodie"],
   hats: ["hat"],
};

app.get("/api/test", async (req, res) => {
   await Product.deleteMany();
   await Product.insertMany(
      [
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek510",
               "https://via.placeholder.com/600x500?text=2-hh5oek510",
            ],
            inStock: 6,
            price: 400,
            slug: "lorem_ipsum_0",
            title: "lorem ipsum hh5oek510",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek511",
               "https://via.placeholder.com/600x500?text=2-hh5oek511",
            ],
            inStock: 18,
            price: 200,
            slug: "lorem_ipsum_1",
            title: "lorem ipsum hh5oek511",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek512",
               "https://via.placeholder.com/600x500?text=2-hh5oek512",
            ],
            inStock: 22,
            price: 150,
            slug: "lorem_ipsum_2",
            title: "lorem ipsum hh5oek512",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek513",
               "https://via.placeholder.com/600x500?text=2-hh5oek513",
            ],
            inStock: 15,
            price: 200,
            slug: "lorem_ipsum_3",
            title: "lorem ipsum hh5oek513",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek514",
               "https://via.placeholder.com/600x500?text=2-hh5oek514",
            ],
            inStock: 14,
            price: 100,
            slug: "lorem_ipsum_4",
            title: "lorem ipsum hh5oek514",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek515",
               "https://via.placeholder.com/600x500?text=2-hh5oek515",
            ],
            inStock: 23,
            price: 250,
            slug: "lorem_ipsum_5",
            title: "lorem ipsum hh5oek515",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek516",
               "https://via.placeholder.com/600x500?text=2-hh5oek516",
            ],
            inStock: 7,
            price: 300,
            slug: "lorem_ipsum_6",
            title: "lorem ipsum hh5oek516",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek517",
               "https://via.placeholder.com/600x500?text=2-hh5oek517",
            ],
            inStock: 8,
            price: 100,
            slug: "lorem_ipsum_7",
            title: "lorem ipsum hh5oek517",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek518",
               "https://via.placeholder.com/600x500?text=2-hh5oek518",
            ],
            inStock: 7,
            price: 250,
            slug: "lorem_ipsum_8",
            title: "lorem ipsum hh5oek518",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek519",
               "https://via.placeholder.com/600x500?text=2-hh5oek519",
            ],
            inStock: 15,
            price: 200,
            slug: "lorem_ipsum_9",
            title: "lorem ipsum hh5oek519",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5110",
               "https://via.placeholder.com/600x500?text=2-hh5oek5110",
            ],
            inStock: 11,
            price: 100,
            slug: "lorem_ipsum_10",
            title: "lorem ipsum hh5oek5110",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5111",
               "https://via.placeholder.com/600x500?text=2-hh5oek5111",
            ],
            inStock: 23,
            price: 100,
            slug: "lorem_ipsum_11",
            title: "lorem ipsum hh5oek5111",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5112",
               "https://via.placeholder.com/600x500?text=2-hh5oek5112",
            ],
            inStock: 2,
            price: 150,
            slug: "lorem_ipsum_12",
            title: "lorem ipsum hh5oek5112",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5113",
               "https://via.placeholder.com/600x500?text=2-hh5oek5113",
            ],
            inStock: 22,
            price: 350,
            slug: "lorem_ipsum_13",
            title: "lorem ipsum hh5oek5113",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5114",
               "https://via.placeholder.com/600x500?text=2-hh5oek5114",
            ],
            inStock: 22,
            price: 350,
            slug: "lorem_ipsum_14",
            title: "lorem ipsum hh5oek5114",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5115",
               "https://via.placeholder.com/600x500?text=2-hh5oek5115",
            ],
            inStock: 22,
            price: 400,
            slug: "lorem_ipsum_15",
            title: "lorem ipsum hh5oek5115",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5116",
               "https://via.placeholder.com/600x500?text=2-hh5oek5116",
            ],
            inStock: 12,
            price: 200,
            slug: "lorem_ipsum_16",
            title: "lorem ipsum hh5oek5116",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5117",
               "https://via.placeholder.com/600x500?text=2-hh5oek5117",
            ],
            inStock: 4,
            price: 350,
            slug: "lorem_ipsum_17",
            title: "lorem ipsum hh5oek5117",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5118",
               "https://via.placeholder.com/600x500?text=2-hh5oek5118",
            ],
            inStock: 7,
            price: 150,
            slug: "lorem_ipsum_18",
            title: "lorem ipsum hh5oek5118",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5119",
               "https://via.placeholder.com/600x500?text=2-hh5oek5119",
            ],
            inStock: 3,
            price: 350,
            slug: "lorem_ipsum_19",
            title: "lorem ipsum hh5oek5119",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5120",
               "https://via.placeholder.com/600x500?text=2-hh5oek5120",
            ],
            inStock: 18,
            price: 300,
            slug: "lorem_ipsum_20",
            title: "lorem ipsum hh5oek5120",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5121",
               "https://via.placeholder.com/600x500?text=2-hh5oek5121",
            ],
            inStock: 17,
            price: 100,
            slug: "lorem_ipsum_21",
            title: "lorem ipsum hh5oek5121",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5122",
               "https://via.placeholder.com/600x500?text=2-hh5oek5122",
            ],
            inStock: 2,
            price: 300,
            slug: "lorem_ipsum_22",
            title: "lorem ipsum hh5oek5122",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5123",
               "https://via.placeholder.com/600x500?text=2-hh5oek5123",
            ],
            inStock: 20,
            price: 400,
            slug: "lorem_ipsum_23",
            title: "lorem ipsum hh5oek5123",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5124",
               "https://via.placeholder.com/600x500?text=2-hh5oek5124",
            ],
            inStock: 2,
            price: 200,
            slug: "lorem_ipsum_24",
            title: "lorem ipsum hh5oek5124",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5125",
               "https://via.placeholder.com/600x500?text=2-hh5oek5125",
            ],
            inStock: 19,
            price: 400,
            slug: "lorem_ipsum_25",
            title: "lorem ipsum hh5oek5125",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5126",
               "https://via.placeholder.com/600x500?text=2-hh5oek5126",
            ],
            inStock: 23,
            price: 100,
            slug: "lorem_ipsum_26",
            title: "lorem ipsum hh5oek5126",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5127",
               "https://via.placeholder.com/600x500?text=2-hh5oek5127",
            ],
            inStock: 7,
            price: 150,
            slug: "lorem_ipsum_27",
            title: "lorem ipsum hh5oek5127",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5128",
               "https://via.placeholder.com/600x500?text=2-hh5oek5128",
            ],
            inStock: 18,
            price: 300,
            slug: "lorem_ipsum_28",
            title: "lorem ipsum hh5oek5128",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5129",
               "https://via.placeholder.com/600x500?text=2-hh5oek5129",
            ],
            inStock: 14,
            price: 400,
            slug: "lorem_ipsum_29",
            title: "lorem ipsum hh5oek5129",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5130",
               "https://via.placeholder.com/600x500?text=2-hh5oek5130",
            ],
            inStock: 21,
            price: 200,
            slug: "lorem_ipsum_30",
            title: "lorem ipsum hh5oek5130",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5131",
               "https://via.placeholder.com/600x500?text=2-hh5oek5131",
            ],
            inStock: 19,
            price: 250,
            slug: "lorem_ipsum_31",
            title: "lorem ipsum hh5oek5131",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5132",
               "https://via.placeholder.com/600x500?text=2-hh5oek5132",
            ],
            inStock: 21,
            price: 200,
            slug: "lorem_ipsum_32",
            title: "lorem ipsum hh5oek5132",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5133",
               "https://via.placeholder.com/600x500?text=2-hh5oek5133",
            ],
            inStock: 16,
            price: 100,
            slug: "lorem_ipsum_33",
            title: "lorem ipsum hh5oek5133",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5134",
               "https://via.placeholder.com/600x500?text=2-hh5oek5134",
            ],
            inStock: 18,
            price: 350,
            slug: "lorem_ipsum_34",
            title: "lorem ipsum hh5oek5134",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5135",
               "https://via.placeholder.com/600x500?text=2-hh5oek5135",
            ],
            inStock: 19,
            price: 200,
            slug: "lorem_ipsum_35",
            title: "lorem ipsum hh5oek5135",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5136",
               "https://via.placeholder.com/600x500?text=2-hh5oek5136",
            ],
            inStock: 9,
            price: 200,
            slug: "lorem_ipsum_36",
            title: "lorem ipsum hh5oek5136",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5137",
               "https://via.placeholder.com/600x500?text=2-hh5oek5137",
            ],
            inStock: 23,
            price: 100,
            slug: "lorem_ipsum_37",
            title: "lorem ipsum hh5oek5137",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5138",
               "https://via.placeholder.com/600x500?text=2-hh5oek5138",
            ],
            inStock: 18,
            price: 400,
            slug: "lorem_ipsum_38",
            title: "lorem ipsum hh5oek5138",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5139",
               "https://via.placeholder.com/600x500?text=2-hh5oek5139",
            ],
            inStock: 21,
            price: 400,
            slug: "lorem_ipsum_39",
            title: "lorem ipsum hh5oek5139",
         },
         {
            images: [
               "https://via.placeholder.com/600x500?text=1-hh5oek5140",
               "https://via.placeholder.com/600x500?text=2-hh5oek5140",
            ],
            inStock: 13,
            price: 250,
            slug: "lorem_ipsum_40",
            title: "lorem ipsum hh5oek5140",
         },
      ].map((product) => {
         const type = types[Math.floor(Math.random() * types.length)];

         return {
            ...product,
            description:
               "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque obcaecati repudiandae impedit quaerat alias deserunt distinctio voluptas sit eum doloribus, ipsa omnis unde voluptates aut delectus ullam iure illo eos?",
            sizes: ["XS", "S", "M", "L", "XL", "XXL"],
            type,
            tags: tagsType[type],
            category: categories[Math.floor(Math.random() * categories.length)],
         };
      })
   );
   res.json({ products: "hola" });
});

app.use("/api/products", require("./routes/products"));

app.use("/api/user", require("./routes/user"));

app.use("/api/orders", require("./routes/orders"));

app.use("/api/admin", require("./routes/admin"));

// nextApp.prepare().then(() => {
//    app.get("*", (req, res) => {
//       return handle(req, res);
//    });
// });

app.listen(PORT, HOST, () => console.log(`server running at http://${HOST}:${PORT}`));

module.exports = app;
