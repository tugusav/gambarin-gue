import { Storage } from "aws-amplify";
import { useState } from "react";

export const uploadImageToS3 = async (image: Blob) => {
  try {
    // put the image in the user's folder in S3
    const key = `original/${image.name}`;

    // upload the image to s3 bucket
    await Storage.put(key, image, {
      level: "private",
      contentType: "image/jpeg",
    });

    console.log("Image uploaded successfully");
  } catch (error) {
    console.log("Error uploading image", error);
  }
};

