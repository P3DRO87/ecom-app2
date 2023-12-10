import Input from "@/components/fragments/Input";
import Textarea from "@/components/fragments/Textarea";
import Layout from "@/components/templates/Layout";
import { getProduct } from "@/helpers/products-db";
import React from "react";
import { useForm } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";

const AdminProduct = ({ product }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: {} });

   return (
      <div className="page-admin-product">
         <div className="container">
            <div className="row">
               <div className="col-lg-auto">
                  <h1 className="mt-5">
                     <FiEdit3 className="me-2" />
                     Producto
                  </h1>
                  <p className="fs-5">Editando: {product.title}</p>
               </div>
            </div>
         </div>

         <div className="container">
            <div className="col-lg-6">
               <Textarea
                  label="Titulo"
                  className="mb-4"
                  // {...register("address", {
                  //    required: "La direccion es requerida",
                  // })}
                  // error={!!errors.address}
                  // helperText={errors.address?.message}
               />
            </div>
            <div className="col-lg-6"></div>
         </div>
      </div>
   );
};

export default AdminProduct;

AdminProduct.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = async ({ params }) => {
   const { id } = params;

   const [product] = await getProduct({ slug: id });

   if (!product) return { notFound: true };

   return {
      props: {
         product,
      },
   };
};
