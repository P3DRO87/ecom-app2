import Chip from "@/components/fragments/Chip";
import GoogleBtn from "@/components/fragments/GoogleBtn";
import Input from "@/components/fragments/Input";
import { loginUser } from "@/helpers/auth-db";
import { isEmail } from "@/helpers/validations";
import { authUser } from "@/redux/authDux";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

const Login = () => {
   const dispatch = useDispatch();

   const router = useRouter();

   const [error, setError] = useState(null);
   const [providers, setProviders] = useState([]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const destination = router.query.p?.toString() || "/";

   const handleLogin = async (formData) => {
      const [loginRes, error] = await loginUser(formData);

      if (error) return setError(error);

      const { user, token } = loginRes;

      Cookies.set("user", JSON.stringify(user));
      Cookies.set("token", token);

      dispatch(authUser(user));

      router.replace(destination);

      setError(null);
   };

   return (
      <div className="login-page">
         <div className="container mt-5">
            <div className="row justify-content-center">
               <div className="col-lg-5 col-md-7 col-sm-10 col-12">
                  <div className="login-container shadow px-4 px-md-5 py-3 rounded-4px info-box">
                     <h1 className="mb-3">Log in</h1>
                     <form
                        noValidate
                        onSubmit={handleSubmit(handleLogin)}
                        className="d-flex flex-column gap-3 "
                     >
                        {error && (
                           <Chip
                              label={error}
                              color="error"
                              icon={<MdErrorOutline />}
                              className="fade-in"
                           />
                        )}

                        <Input
                           {...register("email", {
                              required: "El email es requerido",
                              validate: (email) => isEmail(email, "Email invalido"),
                           })}
                           label="email"
                           type="email"
                           error={!!errors.email}
                           helperText={errors.email?.message}
                        />
                        <Input
                           {...register("password", {
                              required: "La contraseña es requerida",
                              minLength: {
                                 value: 6,
                                 message: "La contraseña debe ser mayor de 5 caracteres",
                              },
                           })}
                           type="password"
                           label="password"
                           error={!!errors.password}
                           helperText={errors.password?.message}
                        />
                        <button type="submit" className="btn-primary mt-4">
                           Iniciar sesion
                        </button>
                     </form>
                     <div className="d-flex w-100">
                        <Link
                           className="ms-auto mt-3"
                           href={`/auth/register?p=${destination}`}
                        >
                           Crear cuenta
                        </Link>
                     </div>
                     <hr />
                     <p className="w-100 text-center">O</p>
                     <div className="oauth-providers">
                        <GoogleBtn className="my-3" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;

export const getServerSideProps = async ({ req, query }) => {
   const { token } = req.cookies;

   const { p = "/" } = query;

   if (token) {
      return { redirect: { destination: p, permanent: false } };
   }

   return {
      props: {},
   };
};
