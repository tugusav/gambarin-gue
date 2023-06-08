import ImageGallery from '@/components/ImageGallery'
import { withAuthenticator } from '@aws-amplify/ui-react'
import React from 'react'

function MyImages() {
  return (
    <>
    <ImageGallery/>    
    </>
    )
}
export default withAuthenticator(MyImages);
// export default MyImages;