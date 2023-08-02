/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { S3ProviderListOutputItem } from "@aws-amplify/storage";
import { Auth, Storage } from "aws-amplify";

export default function ImageGallery() {
  const [imageKeys, setImageKeys] = useState<S3ProviderListOutputItem[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const s3_target_bucket = process.env.NEXT_PUBLIC_S3_TARGET_BUCKET

  const fetchImages = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const key = `${user["username"]}/`;
    // console.log(key);
    const { results } = await Storage.list(key, {
      bucket: s3_target_bucket,
    });
    // console.log(results);
    setImageKeys(results);
    const s3Images = await Promise.all(
      results.slice(0).reverse().map(
        async (image) =>
          await Storage.get(image.key!, {
            bucket: s3_target_bucket,
          })
      )
    );
    setImages(s3Images);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const isEmpty = images.length === 0;

  return (
    <>
      {!isEmpty ? (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {images.map((imageUrl, index) => (
              <div className="rounded-lg bg-gray-200" key={index}>
                <BlurImage index={index} imgSrc={imageUrl} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-center text-base font-semibold text-gray-900">
            No generated images yet. Generate now!
          </h1>
        </div>
      )}
    </>
  );
}

function BlurImage({ imgSrc, index }: any) {
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <a href={imgSrc} target="_blank" className="group">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            alt={`Image ${index + 1}`}
            fill={true}
            sizes="full"
            src={imgSrc}
            className={`'group-hover:opacity-75 duration-700 ease-in-out'${
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            }`}
            style={{ objectFit: "cover" }}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      </a>
    </>
  );
}
