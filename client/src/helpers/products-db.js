import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProduct = async ({ slug, serverUrl = "" }) => {
   let URL = `${BASE_URL}/products/${slug}`;

   try {
      const { data } = await axios.get(URL);

      return [data.product, null];
   } catch (error) {
      return [null, error.message];
   }
};

export const getAllProducts = async (category = "all") => {
   const URL = `${BASE_URL}/products?category=${"all"}`;

   try {
      const { data } = await axios.get(URL);

      console.log(data);

      return [data.products, null];
   } catch (error) {
      return [null, error.message];
   }
};

export const searchProducts = async (query) => {
   const URL = `${BASE_URL}/products/search?query=${query}`;

   try {
      const { data } = await axios.get(URL);

      return [data.products, null];
   } catch (error) {
      return [null, error.message];
   }
};
