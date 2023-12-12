import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProduct = async ({ slug, serverUrl = "" }) => {
   let URL = `${BASE_URL}/products/${slug}`;

   try {
      const { data } = await axios.get(URL);

      return [data.product, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const getAllProducts = async (category = "all") => {
   const URL = `${BASE_URL}/products?category=${category}`;

   try {
      const { data } = await axios.get(URL);

      return [data.products, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const searchProducts = async (query) => {
   const URL = `${BASE_URL}/products/search?query=${query}`;

   try {
      const { data } = await axios.get(URL);

      return [data.products, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const createProduct = async (product) => {
   const URL = `${BASE_URL}/products/create`;

   try {
      const { data } = await axios.post(URL, product);

      return [data.product, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const updateProduct = async (id, product) => {
   const URL = `${BASE_URL}/products/update/${id}`;

   try {
      const { data } = await axios.put(URL, product);

      return [data.product, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const uploadFiles = async (files) => {
   const URL = `${BASE_URL}/uploads/images/`;

   try {
      for (const file of files) {
         const { data } = await axios.put(URL, file);

         console.log(data);
      }

      // return [data.product, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};
