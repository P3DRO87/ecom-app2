import Input from "@/components/fragments/Input";
import Textarea from "@/components/fragments/Textarea";
import Layout from "@/components/templates/Layout";
import { createProduct, getProduct, updateProduct } from "@/helpers/products-db";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";
import { CiSaveDown2 } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import RadioButton from "@/components/fragments/RadioButton";
import Checkbox from "@/components/fragments/Checkbox";
import { IoIosClose } from "react-icons/io";
import Chip from "@/components/fragments/Chip";
import { sizes, types, categories, categoriesMap } from "@/helpers/product-admin-info";
import { useRouter } from "next/router";
import { isValidImg } from "@/helpers/validations";

const intialProduct = {
   category: "",
   createdAt: "",
   description: "",
   images: [
      "https://via.placeholder.com/600x500?text=1-default",
      "https://via.placeholder.com/600x500?text=2-default",
   ],
   inStock: 1,
   price: 1,
   sizes: [],
   slug: "",
   tags: [],
   title: "",
   type: "",
};

const AdminProduct = ({ product }) => {
   const router = useRouter();

   const {
      setValue,
      getValues,
      watch,
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: product || intialProduct });

   const [tagInput, setTagInput] = useState("");
   const [tags, setTags] = useState(product?.tags || []);
   const [isSaving, setIsSaving] = useState(false);
   const [isSlugFocus, setIsSlugFocus] = useState(!!product?.slug);
   const [fileImages, setFileImages] = useState(product.images);

   const fileInputRef = useRef();

   const handleSaveProduct = async (formData) => {
      if (isSaving) return;

      if (formData.images.length < 2) {
         return alert("Es necesario un minimo de 2 imagenes");
      }

      setIsSaving(true);

      if (!formData._id) {
         const formToSend = new FormData();

         Object.entries(formData).forEach(([key, value]) =>
            formToSend.append(key, value)
         );

         formToSend.append("images", fileImages);

         const [newProduct] = await createProduct(formData);

         if (newProduct) return alert("Fallo al crear");

         router.replace(`/admin/products/${formData.slug}`);

         return;
      }

      const [updatedProduct, error] = await updateProduct(formData._id, formData);

      if (error) {
         setIsSaving(false);
         return alert("Fallo al guardar");
      }

      Object.entries(updatedProduct).forEach(([key, value]) => {
         setValue(key, value, { shouldValidate: true });
      });

      setIsSaving(false);
   };

   const handleAddTag = (newTag) => {
      if (tags.includes(newTag.trim())) return;

      setTags((prev) => [...prev, newTag.trim()]);

      setValue("tags", [...tags, newTag.trim()]);

      setTagInput("");
   };


   const handleDeleteTag = (tagToDelete) => {
      setTags((prev) => prev.filter((tag) => tag !== tagToDelete));

      setValue(
         "tags",
         tags.filter((tag) => tag !== tagToDelete)
      );
   };

   const handleSetSize = (size) => {
      const sizesMap = getValues("sizes").reduce(
         (acc, size) => ({ ...acc, [size]: size }),
         {}
      );

      if (size in sizesMap) {
         delete sizesMap[size];
         return setValue("sizes", Object.values(sizesMap), { shouldValidate: true });
      }

      sizesMap[size] = size;
      setValue("sizes", Object.values(sizesMap), { shouldValidate: true });
   };

   const handleSelectFiles = ({ target }) => {
      const files = Object.values(target.files);

      if (!target.files || target.files.length === 0) return;

      if (files.some((file) => !isValidImg(file.type))) {
         alert("Revisa que todas la imagenes sean validas");
      }

      setFileImages(files);

      const fileReader = new FileReader();
   };

   useEffect(() => {
      const subscription = watch((value, { name, type }) => {
         if (name === "title") {
            const newSlug =
               value.title
                  .trim()
                  .replaceAll(" ", "_")
                  .replaceAll("'", "_")
                  .replaceAll("ñ", "n")
                  .toLowerCase() || "";

            setValue("slug", newSlug);
         }

         setIsSlugFocus(value["title"].length > 0);
      });

      return () => subscription.unsubscribe();
   }, [watch, setValue]);

   return (
      <div className="page-admin-product">
         <div className="container mt-5 mb-3">
            <div className="row">
               <div className="col-lg-auto">
                  <h1>
                     <FiEdit3 className="me-2" />
                     Producto
                  </h1>
                  <p className="fs-5 mb-0">
                     Editando: <span className="text-bold-600">{product?.title}</span>
                  </p>
               </div>
               <div className="col-lg-5 ms-auto d-flex">
                  <button
                     disabled={isSaving}
                     onClick={handleSubmit(handleSaveProduct)}
                     className="btn-primary btn-save-product mt-auto ms-auto"
                  >
                     <CiSaveDown2 className="me-2" />
                     {isSaving ? "Cargando" : " Guardar"}
                  </button>
               </div>
            </div>
         </div>

         <div className="container">
            <div className="row">
               <div className="col-lg-6">
                  <Input
                     label="Titulo"
                     className="mb-3"
                     {...register("title", {
                        required: "El titulo es requerido",
                     })}
                     error={!!errors.title}
                     helperText={errors.title?.message}
                  />
                  <Textarea
                     label="Descripcion"
                     {...register("description", {
                        required: "La descripcion es requerida",
                     })}
                     className="mb-3"
                     error={!!errors.description}
                     helperText={errors.description?.message}
                  />
                  <Input
                     label="Inventario"
                     type="number"
                     className="mb-3"
                     {...register("inStock", {
                        required: "El inventario es requerido",
                        validate: (val) =>
                           +val < 1
                              ? "El inventario no puede ser menor que 1"
                              : undefined,
                     })}
                     error={!!errors.inStock}
                     helperText={errors.inStock?.message}
                  />
                  <Input
                     label="Precio"
                     type="number"
                     className="mb-3"
                     {...register("price", {
                        required: "El Precio es requerido",
                        validate: (val) =>
                           +val < 1 ? "El precio no puede ser menor que 1" : undefined,
                     })}
                     error={!!errors.price}
                     helperText={errors.price?.message}
                  />
                  <hr className="my-4" />
                  <p className="fs-5 mb-2">Tipos</p>
                  <div className="radio-btns-container d-flex flex-wrap gap-4 mb-3">
                     {types.map((type) => (
                        <RadioButton
                           onChange={() => {
                              setValue("type", type, { shouldValidate: true });
                           }}
                           checked={type === getValues("type")}
                           key={type}
                           color="#395bc0"
                           label={type}
                           name="type"
                        />
                     ))}
                  </div>
                  <p className="fs-5 mb-2">Genero</p>
                  <div className="radio-btns-container d-flex gap-4 mb-3">
                     {categories.map((category) => (
                        <RadioButton
                           onChange={() => {
                              setValue("category", categoriesMap[category], {
                                 shouldValidate: true,
                              });
                           }}
                           checked={
                              categoriesMap[category] ===
                              getValues("category", { shouldValidate: true })
                           }
                           key={category}
                           color="#395bc0"
                           label={category}
                           name="category"
                        />
                     ))}
                  </div>
                  <p className="fs-5 mb-2">Tallas</p>
                  <div className="checkboxes-container">
                     {sizes.map((size) => (
                        <Checkbox
                           onChange={() => handleSetSize(size)}
                           checked={getValues("sizes").includes(size)}
                           label={size}
                           key={size}
                           className="mb-2"
                        />
                     ))}
                  </div>
               </div>
               <div className="col-lg-6">
                  <Input
                     label="Slug - URL"
                     className="mb-3"
                     isExternalFoucsActive={isSlugFocus}
                     {...register("slug", {
                        required: "El slug es requerido",
                        validate: (val) =>
                           val.trim().includes(" ")
                              ? "No puede tener espacios en blanco"
                              : undefined,
                     })}
                     error={!!errors.slug}
                     helperText={errors.slug?.message}
                  />
                  <Input
                     value={tagInput}
                     onChange={({ target }) => setTagInput(target.value)}
                     onKeyUp={({ key, currentTarget }) =>
                        key === " " && handleAddTag(currentTarget.value)
                     }
                     label="Slug - Etiquetas"
                  />
                  <p className="ms-3 mb-3 color-grey">Presiona [Espacio] para agregar</p>
                  <div className="tags d-flex gap-2">
                     {tags.map((tag) => (
                        <div
                           key={tag}
                           className="rounded-45px tag-item d-flex align-items-center"
                        >
                           <span className="me-2">{tag}</span>
                           <button className="delete-btn">
                              <IoIosClose onClick={() => handleDeleteTag(tag)} />
                           </button>
                        </div>
                     ))}
                  </div>
                  <hr className="my-4" />
                  <p className="fs-5 mb-0">Imagenes</p>
                  <input
                     multiple
                     onChange={handleSelectFiles}
                     className="d-none"
                     ref={fileInputRef}
                     type="file"
                  />
                  <button
                     onClick={() => fileInputRef.current.click()}
                     className="btn-primary upload-image-btn mt-2 mb-4"
                  >
                     <GoUpload className="me-2" />
                     Cargar imagen
                  </button>
                  <Chip
                     color="error"
                     label="Es necesario al menos 2 imagenes"
                     className="w-100"
                  />
                  <div className="row mt-4">
                     {getValues("images").map((src, i) => (
                        <div key={src} className="col-lg-3 col-md-3 col-2">
                           <div className="image-item">
                              <img className="img-fluid fade-in" src={src} alt="" />
                              <div className="button-container d-flex justify-content-center px-2 py-3">
                                 <button className="btn-primary w-100">Borrar</button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminProduct;

AdminProduct.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = async ({ params }) => {
   const { id } = params;

   if (id === "new") return { props: { product: null } };

   const [product] = await getProduct({ slug: id });

   if (!product) return { notFound: true };

   return {
      props: {
         product,
      },
   };
};
