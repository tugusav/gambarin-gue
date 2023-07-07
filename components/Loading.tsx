import React from 'react'
import { GridLoader } from 'react-spinners'

function LoadingScreen({loading_text} : {loading_text : string}) {
  return (
    <div className="p-10 flex flex-col space-y-20 items-center justify-center min-h-screen h-screen">
        <GridLoader color="#FFA500" size={40} />
    <h3 className="text-center hover:bg-orange-700 text-black text-2xl font-bold">{loading_text}</h3>
</div>
  )
}

export default LoadingScreen;