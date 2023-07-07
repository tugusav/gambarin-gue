import { withAuthenticator } from "@aws-amplify/ui-react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Auth } from "aws-amplify";
type WebcamPageProps = {};
import { uploadImageToS3 } from "@/src/services/storage";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import LoadingScreen from "@/components/Loading";

const WebcamPage: React.FC<WebcamPageProps> = () => {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);
  const user = Auth.currentAuthenticatedUser();
  const [loading, setLoading] = useState(false);

  const capturePhoto = () => {
    const data = webcamRef.current?.getScreenshot();
    // convert the imageSrc to base64
    const imageSrc = data
      ?.toString()
      .replace(/^data:image\/webp;base64,/, "data:image/jpg;base64,");
    if (imageSrc) {
      const extension = "jpeg"; // Change this to the desired image file extension
      const fileName = `captured-image-${Date.now()}.${extension}`;
      const blob = dataURLtoBlob(imageSrc);
      const file = new File([blob], fileName, { type: `image/${extension}` });
      setCapturedImage(file);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const submitPhoto = async () => {
    try {
      setLoading(true);
      const img_key = await uploadImageToS3(capturedImage!);
      // console.log("S3 Image Key: ", img_key);
      // router.push(`/generate?key=${img_key}`);
      router.push(
        {
          pathname: "/generate",
          query: { key: img_key },
        },
        "/generate"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const byteString = Buffer.from(dataURL.split(",")[1], "base64").toString(
      "binary"
    );
    const mimeString = "image/jpeg"; // Specify JPEG MIME type
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <>
      <Head>
        <title>Take Photo</title>
      </Head>
      <div>
        {loading ? (
          <div className="min-h-screen flex flex-col items-center justify-center py-2">
            <LoadingScreen loading_text="Uploading photo..." />
          </div>
        ) : capturedImage ? (
          <div className="flex flex-col space-y-5 min-h-screen items-center justify-center">
            <h1 className="text-4xl font-bold items-center justify-center text-center">
              Ready to generate?
            </h1>
            <Image
              src={URL.createObjectURL(capturedImage)}
              alt="Captured"
              className="rounded-xl jus"
              width={640}
              height={640}
            />
            <div className="flex sm:flex-col lg:flex-row items-center justify-center">
              <button
                className="bg-gray-100 text-orange-500 hover:bg-gray-300 hover:text-orange-700 text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl"
                onClick={retakePhoto}
              >
                Retake
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl shadow-md"
                onClick={submitPhoto}
              >
                Generate
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-5 min-h-screen items-center justify-center py-10 ">
            <h1 className="text-4xl font-bold items-center justify-center text-center">
              Take your photo!
            </h1>
            <Webcam
              audio={false}
              mirrored={true}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              height={640}
            />
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white text-2xl font-bold py-4 px-8 lg:py-10 lg:px-16 rounded-3xl"
              onClick={capturePhoto}
            >
              Capture
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default withAuthenticator(WebcamPage);
