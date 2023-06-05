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
    setCapturedImage(imageSrc);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const submitPhoto = async () => {
    try {
      const response = await axios.post("your-api-endpoint", {
        image: capturedImage,
      });
      console.log(response.data); // Do something with the API response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {capturedImage ? (
        <div className="flex flex-col space-y-5 items-center justify-center py-10">
          <Image
            src={capturedImage}
            alt="Captured"
            className="rounded-xl"
            width={1280}
            height={720}
          />
          <div className="flex flex-row space-x-5 items-center justify-center">
          <button className="bg-white text-orange-500 hover:bg-gray-100 hover:text-orange-700  text-2xl font-bold py-10 px-40 rounded-3xl" onClick={retakePhoto}>Retake</button>
          <button className="bg-orange-500 hover:bg-orange-700 text-white text-2xl font-bold py-10 px-40 rounded-3xl shadow-md" onClick={submitPhoto}>Submit</button>
          </div>
        </div>
      ) : (
        // make webcam in the middle of screen
        <div className="flex flex-col space-y-5 items-center justify-center py-10">
          <Webcam audio={false} mirrored={true} ref={webcamRef} width={1280} height={720} />
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white text-2xl font-bold py-10 px-40 rounded-3xl"
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
