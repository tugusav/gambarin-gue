import React from 'react'
import { GridLoader } from 'react-spinners'

function LoadingScreen() {
  return (
    <div className="p-10 flex flex-col space-y-20 items-center justify-center min-h-screen h-screen">
        <GridLoader color="#FFA500" size={50} />
    <h3 className="text-center hover:bg-orange-700 text-black text-2xl font-bold">Generating image...</h3>
</div>
  )
}

export default LoadingScreen;