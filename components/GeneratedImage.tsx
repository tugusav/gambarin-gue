import React from "react";
import { Storage } from "aws-amplify";
import Image from "next/image";
import { QRCodeCanvas}from "qrcode.react";

function GeneratedImage({ image, imgUrl } : { image: string, imgUrl: string }) {
  return (
    // make it in the middle of the screen
    <div className="flex flex-col items-center justify-center">
    <h1 className="text-center text-3xl font-bold mb-4">Your Generated Image</h1>
    <div className="flex flex-col items-center lg:flex-row space-y-5 space-x-0 lg:space-x-5 lg:space-y-0 justify-center">
      {image && (
        <a href={imgUrl} target="_blank" rel="noreferrer">
          <Image
            src={image}
            alt="Generated Image" 
            className="rounded-lg py-12"
            height={480}
            width={640}
          />
        </a>
      )}
     {imgUrl && (
        <div className="ml-4">
          <h1 className="text-center text-xl mb-4"> Scan the QR Code to Download the Image! </h1>
          <div className="mx-auto">
            <QRCodeCanvas value={imgUrl} size={400} className="mx-auto"/>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default GeneratedImage;
