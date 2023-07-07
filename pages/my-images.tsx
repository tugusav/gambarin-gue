import ImageGallery from "@/components/ImageGallery";
import { Authenticator } from "@aws-amplify/ui-react";
import Head from "next/head";
import React from "react";

function MyImages() {
  return (
    <>
    <Head>
      <title>My Images</title>
    </Head>
      <div className="items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-10">
        <Authenticator>{({ signOut, user }) => <ImageGallery />}</Authenticator>
      </div>
    </>
  );
}
export default MyImages;
