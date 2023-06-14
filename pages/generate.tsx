import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
function Generate() {
  // api call for stablediffusion image generation

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);


  //   const generate = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch("/api/generate");
  //       const data = await response.json();
  //       setImage(data.image);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    // place loader in center of page
    <div className="p-10 flex flex-col space-y-20 items-center justify-center min-h-screen h-screen">
        <ClimbingBoxLoader color="#FFA500" size={30} />
        <h3 className="text-center hover:bg-orange-700 text-black text-xl font-bold">Image is generating...</h3>
    </div>
  );
}

export default Generate;
