import { Storage } from "aws-amplify";
import { useState } from "react";
import { Auth } from "aws-amplify";
import AWS from 'aws-sdk';


export const uploadImageToS3 = async (image: Blob) => {
  try {
    // put the image in the user's folder in S3
    const user = await Auth.currentAuthenticatedUser();
    const key = `${user['username']}/${image.name}`;

    // upload the image to s3 bucket
    const return_val = await Storage.put(key, image, {
      bucket: "gambaringue-user-images",
      level: "public",
      contentType: "image/jpeg",
    });
    console.log(return_val);
    console.log("Image uploaded successfully");
    return key;
  } catch (error) {
    console.log("Error uploading image", error);
    return null
  }
};

// export const uploadImageToS3 =  async (image: Blob) => {
//   try {
//     const user = await Auth.currentAuthenticatedUser();
//     const { username } = user['username'];
//     const key = `${username}/${image.name}`;

//     const s3 = new AWS.S3();

//     const params = {
//       Bucket: 'gambaringue-user-images',
//       Key: key,
//       Body: image,
//       ContentType: image.type, // Set the content type of the file
//     };

//     await s3.upload(params).promise();

//     console.log('Image uploaded successfully', key);
//     return key;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//   }
// }