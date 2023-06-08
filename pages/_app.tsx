import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import GalleryLayout from '@/components/GalleryLayout'
import { Amplify } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
import awsExports from './aws-exports'

Amplify.configure({...awsExports, ssr: true})


function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default App;


