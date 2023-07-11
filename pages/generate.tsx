/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Auth, Storage } from "aws-amplify";
import LoadingScreen from "@/components/Loading";
import GeneratedImage from "@/components/GeneratedImage";
import Link from "next/link";
import rekogClient from "../helpers/rekognition";
import { DetectFacesCommand } from "@aws-sdk/client-rekognition";
import Head from "next/head";
import { responseToPrompt } from "@/helpers/variable_mapper";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { request } from "http";

async function fetchWithTimeout(
  resource: RequestInfo,
  options: {
    timeout?: number;
    headers?: HeadersInit;
    method?: string;
    body?: string;
  } = {}
): Promise<Response> {
  const { timeout = 30000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

function Generate() {
  const router = useRouter();
  const [key, setImageKey] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
      const user = await Auth.currentAuthenticatedUser();
      // check if key is undefined from router query and user is logged in
      if (!router.query.key || !user) {
        router.replace("/");
      }
    };
    checkAuth();
  });

  useEffect(() => {
    // Get the image key from the router query when the component mounts
    const { key, prompt } = router.query
    setCustomPrompt(prompt as string);
    setImageKey(key as string);
    setLoading(true);
  }, [router.query]);

  // Set params
  const rekognitionParams = {
    Attributes: ["ALL"],
    Image: {
      S3Object: {
        Bucket: "gambaringue-user-images",
        Name: `public/${key}`,
      },
    },
  };
  const generateImage = async (rekognitionPrompt: string, customPrompt: string, negativePrompt: string) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;

      const requestHeader = {
        "Content-Type": "application/json",
        Authorization: `${token}`,
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
          prompt: customPrompt.trim() !== "" ? `${customPrompt}, ${rekognitionPrompt}` : rekognitionPrompt,
          num_inference_steps: 90,
          guidance_scale: 7.5,
          num_images_per_prompt: 1,
          negative_prompt:
            `ugly, not safe for work, bad anatomy, disfigured, pixelated, low quality, text, watermark, duplicate, poorly drawn face, ${negativePrompt}`,
          batch_size: 2,
          strength: 0.7,
          scheduler: "DDIMScheduler",
        },
      };
      console.log("Fetching image...");
      console.log(`Generating image with prompt: ${requestBody.parameters.prompt} \n and negative prompt: ${requestBody.parameters.negative_prompt}`)
      const response = await fetchWithTimeout(
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
        setLoading(false);
        setSuccess(true);
      } else {
        console.error("API request failed with status:", response.status);
        setLoading(false);
        setSuccess(false);
      }
    } catch (error) {
      console.error("API request failed with error:", error);
      setLoading(false);
      setSuccess(false);
    }
  };

  const detect_face_and_generate = async () => {
    try {
      console.log(key);
      const response = await rekogClient.send(
        new DetectFacesCommand(rekognitionParams)
      );
      console.log("Detecting face...");
      if (
        response &&
        response.FaceDetails !== undefined &&
        response.FaceDetails.length > 0
      ) {
        console.log(response);
        // Accessing specific attributes
        const faceDetails = response.FaceDetails[0];

        const {prompt, negative_prompt} = responseToPrompt(faceDetails);
        

        // Generate the prompt
        const rekognitionPrompt = `cartoon, caricature, funny, detailed, exaggerated, ${prompt}`
        
        // call generate function
        generateImage(rekognitionPrompt, customPrompt, negative_prompt);
      } else {
        console.log("No face detected");
        generateImage("make a crazy image out of this", '', '');
        // handle case when face not detected
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleRegenerate = async () => {
    setLoading(true);
    setSuccess(false);
    setImage("");
    setUrl("");
    setGeneratedKey("");
  };

  // Call generateImage when loading
  useEffect(() => {
    if (loading && !success) {
      detect_face_and_generate();
    }
  }, [loading, success]);

  return (
    <>
      <Head>
        <title>Generate Image</title>
      </Head>
      {loading && !success ? (
        <div className="items-center w-full h-screen justify-center">
          <LoadingScreen loading_text="Generating image..." />
        </div>
      ) : (
        <>
          {success ? (
            <div className="flex flex-col items-center w-full min-h-screen justify-center space-y-10 p-4">
              <GeneratedImage image={image} imgUrl={url} />
              <div className="flex flex-col lg:flex-row items-center justify-center ">
                <button
                  className="items-center justify-center bg-gray-100 text-orange-500 hover:bg-gray-300 hover:text-orange-700 text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl"
                  onClick={handleRegenerate}
                >
                  Regenerate
                </button>
                <Link
                  href={url}
                  className="items-center justify-center bg-orange-500 text-white hover:bg-orange-700 text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl"
                >
                  Download
                </Link>
                <Link
                  href="/photo"
                  className="items-center justify-center bg-black text-white hover:bg-orange-700 text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl"
                >
                  Retake Photo
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full h-screen justify-center space-y-5">
              <h1 className="text-2xl font-bold text-center">
                Failed to generate image
              </h1>
              {/* show retake photo button */}
              <Link
                href="/photo"
                className="items-center justify-center bg-orange-500 text-white hover:bg-orange-700 text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl"
              >
                Retake
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default withAuthenticator(Generate);
