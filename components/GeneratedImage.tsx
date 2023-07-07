import React from "react";
import { Storage } from "aws-amplify";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";

function GeneratedImage({ image, imgUrl }: { image: string; imgUrl: string }) {
  return (
    // make it in the middle of the screen
    <div className="flex flex-col items-center lg:flex-row justify-center space-y-10">
      {image && (
        <>
          <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-center text-2xl lg:text-3xl font-bold mt-10">
                Your Generated Image
              </h1>
              <Image
                src={image}
                alt="Generated Image"
                className="rounded-lg mx-auto p-5"
                height={480}
                width={640}
              />
          </div>
        </>
      )}
      {imgUrl && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-center text-l lg:text-xl">
            {" "}
            Scan the QR Code to Download the Image!{" "}
          </h1>
          <div className="mx-auto">
            <QRCodeCanvas
              value={imgUrl}
              size={350}
              level="L"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneratedImage;
