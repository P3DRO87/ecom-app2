import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
// import { registerUser } from "@/helpers/auth-db";
// import { isEmail } from "@/helpers/validations";
import { useRouter } from "next/router";
import Input from "@/components/fragments/Input";
import { MdErrorOutline } from "react-icons/md";
import { registerUser } from "@/helpers/auth-db";
import { authUser } from "@/redux/authDux";
import { isEmail } from "@/helpers/validations";
import Cookies from "js-cookie";
import Chip from "@/components/fragments/Chip";
import { useDispatch } from "react-redux";

const Register = () => {
   const router = useRouter();

   const dispatch = useDispatch();

   const [error, setError] = useState(null);

   const destination = router.query.p?.toString() || "/";

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const handleRegisterUser = async (formData) => {
      const [registerRes, error] = await registerUser(formData);
      console.log(error);

      if (error) return setError("Fallo al registrarse");

      const { user, token } = registerRes;

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
               <div className="col-lg-5">
                  <div className="login-container shadow px-4 px-md-5 py-3 rounded-4px info-box">
                     <h1 className="mb-3">Registrarse</h1>
                     <form
                        onSubmit={handleSubmit(handleRegisterUser)}
                        className="d-flex flex-column gap-3"
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
                           {...register("name", {
                              required: "El nombre es requerido",
                           })}
                           label="name"
                           error={!!errors.name}
                           helperText={errors.name?.message}
                        />
                        <Input
                           {...register("email", {
                              required: "El email es requerido",
                              validate: (email) => isEmail(email, "Invalid email"),
                           })}
                           label="email"
                           error={!!errors.email}
                           helperText={errors.email?.message}
                        />
                        <Input
                           type="password"
                           label="password"
                           {...register("password", {
                              required: "La contraseña es requerida",
                              minLength: {
                                 value: 6,
                                 message: "La contraseña debe ser mayor de 5 caracteres",
                              },
                           })}
                           error={!!errors.password}
                           helperText={errors.password?.message}
                        />
                        <button className="btn-primary mt-4">Registrarse</button>
                     </form>
                     <div className="d-flex w-100">
                        <Link className="ms-auto mt-3" href={`/auth/login?p=${123123}`}>
                           inciar sesion
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;

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
