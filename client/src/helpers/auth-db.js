import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async ({ email, password }) => {
   const URL = `${BASE_URL}/user/login`;

   try {
      const { data } = await axios.post(URL, { email, password });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const registerUser = async ({ name, email, password }) => {
   const URL = `${BASE_URL}/user/register`;

   try {
      const { data } = await axios.post(URL, { name, email, password });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const renewToken = async (token = "") => {
   const URL = `${BASE_URL}/user/renew-session`;

   try {
      const { data } = await axios.get(URL, {
         headers: { "x-token": token },
      });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};

export const oAuthLogin = async ({ email = "", name = "" }) => {
   const URL = `${BASE_URL}/user/oauth-login`;

   try {
      const { data } = await axios.post(URL, { email, name });

      return [data, null];
   } catch (error) {
      const errMsg = error?.response?.data.msg || error.message;

      return [null, errMsg];
   }
};
