import React from "react";
import Header from "../sections/Header";
import Head from "next/head";
import SidebarMenu from "../sections/SidebarMenu";

const Layout = ({ title = "Ecom app", pageDescription = "", imageFullUrl, children }) => {
   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name="description" content={pageDescription} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={pageDescription} />
            {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
         </Head>
         <SidebarMenu />
         <Header />
         <main>{children}</main>
      </>
   );
};

export default Layout;
