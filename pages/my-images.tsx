import ImageGallery from "@/components/ImageGallery";
import { Authenticator } from "@aws-amplify/ui-react";
import React from "react";

function MyImages() {
  return (
    <div className="items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-10 h-screen">
      <Authenticator>{({ signOut, user }) => <ImageGallery />}</Authenticator>
    </div>
  );
}
export default MyImages;