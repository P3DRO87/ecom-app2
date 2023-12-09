import Layout from "@/components/templates/Layout";
import { countries } from "@/helpers/contries";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "@/components/fragments/Input";
import MenuItem from "@/components/fragments/MenuItem";
import { setUserAddress } from "@/redux/cartDux";

const initialValues = {
   firstName: "",
   lastName: "",
   address: "",
   city: "",
   country: countries[0].code,
   phone: "",
};

const getUserFromLS = () => {
   if (typeof window !== "object") return {};

   const userFromLS = window.localStorage.getItem("userAddress");

   return userFromLS ? JSON.parse(userFromLS) : initialValues;
};

const Address = () => {
   const router = useRouter();

   const dispatch = useDispatch();

   const userData = getUserFromLS();

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({ defaultValues: userData });

   const handleCheckOrder = (formData) => {
      localStorage.userAddress = JSON.stringify(formData);

      dispatch(setUserAddress(formData));

      router.push("/checkout/summary");
   };

   const handleChangeCountry = (countryCode) => {
      setValue("country", countryCode);
   };

   return (
      <div className="page-address">
         <div className="container">
            <div className="row">
               <div className="col-lg-auto">
                  <h1 className="page-title mt-2rem mb-4">Direccion</h1>
               </div>
            </div>
         </div>
         <form onSubmit={handleSubmit(handleCheckOrder)}>
            <div className="container">
               <div className="row">
                  <div className="col-lg-6">
                     <Input
                        label="Primer nombre"
                        className="mb-4"
                        {...register("firstName", {
                           required: "El nombre es requerido",
                        })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                     />
                     <Input
                        label="Direccion"
                        className="mb-4"
                        {...register("address", {
                           required: "La direccion es requerida",
                        })}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                     />
                     <MenuItem
                        values={countries.map(({ code }) => code)}
                        onChange={handleChangeCountry}
                        label="Pais"
                        defaultValue={countries[0].name}
                        className="mb-4"
                     >
                        {countries.map(({ name }) => (
                           <Fragment key={name}>{name}</Fragment>
                        ))}
                     </MenuItem>
                  </div>
                  <div className="col-lg-6">
                     <Input
                        label="Apellido"
                        className="mb-4"
                        {...register("lastName", {
                           required: "El apellido es requerido",
                        })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                     />
                     <Input
                        label="Ciudad"
                        className="mb-4"
                        {...register("city", {
                           required: "La ciudad es requerida",
                        })}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                     />
                     <Input
                        label="Numero de telefono"
                        className="mb-4"
                        {...register("phone", {
                           required: "El numero de telefono es requerido",
                        })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                     />
                  </div>
               </div>
               <div className="row justify-content-center">
                  <div className="col-8 col-lg-6">
                     <button
                        type="submit"
                        className="btn-primary check-order-btn mt-4 w-100"
                     >
                        Verificar orden
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default Address;

Address.getLayout = (page) => <Layout>{page}</Layout>;
