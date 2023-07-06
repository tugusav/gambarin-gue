// create rekognition client
import { RekognitionClient } from "@aws-sdk/client-rekognition"
import { Auth } from "aws-amplify";

// Set the AWS Region.
const REGION = "ap-southeast-1";


const rekogClient = new RekognitionClient({
  region: REGION,
  credentials: () => Auth.currentCredentials(),
});



export default rekogClient;