import { withAuthenticator } from "@aws-amplify/ui-react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
type WebcamPageProps = {};

const WebcamPage: React.FC<WebcamPageProps> = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  // const submitPhoto = async () => {
  //   try {
  //     const response = await axios.post("your-api-endpoint", {
  //       image: capturedImage,
  //     });
  //     console.log(response.data); // Do something with the API response
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      {capturedImage ? (
        <div className="flex flex-col space-y-5 h-screen items-center justify-center">
          <Image
            src={capturedImage}
            alt="Captured"
            className="rounded-xl"
            width={640}
            height={640}
          />
          <div className="flex sm:flex-col lg:flex-row items-center justify-center">
            <button className="bg-gray-100 text-orange-500 hover:bg-gray-300 hover:text-orange-700 text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl" onClick={retakePhoto}>Retake</button>
            <button className="bg-orange-500 hover:bg-orange-700 text-white text-xl lg:text-2xl font-bold m-2 py-4 px-8 lg:py-10 lg:px-16 rounded-3xl shadow-md">Submit</button>
          </div>
        </div>
      ) : (
        // make div in the middle of screen horizontally and vertically
        <div className="flex flex-col space-y-5 h-screen items-center justify-center py-10 ">
          <Webcam audio={false} mirrored={true} ref={webcamRef} width={640} height={640} />
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white text-2xl font-bold py-4 px-8 lg:py-10 lg:px-16 rounded-3xl"
            onClick={capturePhoto}
          >
            Capture
          </button>
        </div>
      )}
    </div>
  );
};
export default withAuthenticator(WebcamPage);
// export default WebcamPage;
