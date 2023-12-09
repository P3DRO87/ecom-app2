import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createOrder = async (order) => {
   const URL = `${BASE_URL}/orders`;

   try {
      const token = Cookies.get("token");

      const reqConfig = { headers: { "x-token": token || "" } };

      const { data } = await axios.post(URL, { order }, reqConfig);

      return [data.order, null];
   } catch (error) {
      console.log(error.message);
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const checkIsValidOrder = async (orderId, token) => {
   const URL = `${BASE_URL}/orders/check-valid-order`;

   try {
      const reqConfig = { headers: { "x-token": token || "" } };

      const { data } = await axios.post(URL, { id: orderId }, reqConfig);

      return [data.order, null];
   } catch (error) {
      console.log(error.message);
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const getUserOrders = async (token) => {
   const URL = `${BASE_URL}/orders/get-user-orders`;

   try {
      const { data } = await axios.get(URL, { headers: { "x-token": token || "" } });

      return [data.orders, null];
   } catch (error) {
      console.log(error.message);
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const payOrder = async ({ id, orderId, amount, token }) => {
   const URL = `${BASE_URL}/orders/pay`;

   console.log(amount);
   try {
      const body = { amount, id, orderId };

      const reqConfig = { headers: { "x-token": token || "" } };

      const { data } = await axios.post(URL, body, reqConfig);

      return [data, null];
   } catch (error) {
      console.log(error.message);
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};
