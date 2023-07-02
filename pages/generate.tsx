/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Auth, Storage } from "aws-amplify";
import LoadingScreen from "@/components/Loading";
import GeneratedImage from "@/components/GeneratedImage";
import Link from "next/link";


function Generate() {
  const router = useRouter();
  const [key, setImageKey] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get the image key from the router query when the component mounts
    const { key } = router.query;
    setImageKey(key as string);
    setLoading(true)
  }, [router.query]);

  const generateImage = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;

      const requestHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        s3: {
          bucket: {
            name: "gambaringue-user-images",
          },
          object: {
            filename: key.split("/")[1],
            key: key,
          },
          arn: "arn:aws:s3:::gambaringue-user-images",
        },
        username: user["username"],
        parameters: {
          prompt: "caricature style, drawing, realistic, funny",
          num_inference_steps: 90,
          guidance_scale: 7.5,
          num_images_per_prompt: 1,
          negative_prompt: "ugly, not safe for work, bad anatomy",
          batch_size: 2,
          strength: 0.7,
          scheduler: "KDPM2AncestralDiscreteScheduler",
        },
      };
      console.log("calling API");
      const response = await fetch(
        "https://pnn37l8e40.execute-api.us-east-1.amazonaws.com/dev/generate",
        {
          method: "POST",
          headers: requestHeader,
          body: JSON.stringify(requestBody),
        }
      );
      // Handle the response
      if (response.ok) {
        const data = await response.json();
        console.log("API request success:", data);
        const public_img_key = data["key"];
        const img_key = public_img_key.replace("public/", "");
        const img_url = data["url"];
        setGeneratedKey(img_key);

        // download s3 image from response
        const s3Image = await Storage.get(img_key!, {
          bucket: "gambaringue-generated-images",
        });
        setImage(s3Image);
        setUrl(img_url);
      } else {
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("API request failed with error:", error);
    }
    setLoading(false);
  };

  const handleRegenerate = async () => {
    setLoading(true);
    // Delete the previously generated image
    if (generatedKey) {
      await Storage.remove(generatedKey, {
        bucket: "gambaringue-generated-images",
      });
    }
    generateImage();
  };

  // Call generateImage when loading
  useEffect(() => {
    if (loading) {
      generateImage();
    }
  },[loading]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
        <div className="flex flex-col items-center w-full h-screen justify-center space-y-5">
        <GeneratedImage image={image} imgUrl={url} />
        <div className="flex flex-col lg:flex-row items-center justify-center ">
        <button
            className="items-center justify-center bg-gray-100 text-orange-500 hover:bg-gray-300 hover:text-orange-700 text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl"
            onClick={handleRegenerate}
          >
            Regenerate
          </button>
          <Link
          href="/my-images"
          className="items-center justify-center bg-orange-500 text-white hover:bg-orange-700 text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl"
        >
          All Images
          </Link>
        </div>
          
        </div>   
        </>
      )}
    </>
  );
}

export default Generate;
