import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Head>
      <title>Gambarin Gue Home</title>
    </Head>
      <div className="min-h-screen p-10 flex flex-col space-y-10 items-center justify-center py-2">
        <h1 className="text-4xl lg:text-6xl font-bold text-center">
          Welcome to Gambar<span className="text-orange-500">in</span> Gue!{" "}
        </h1>
        <Link
          href="/photo"
          className="bg-orange-500 text-center hover:bg-orange-700 text-white text-2xl lg:text-3xl font-bold py-6 px-10 lg:py-9 lg:px-15 rounded-3xl"
        >
          Take Photo
        </Link>
      </div>
    </>
  );
}
``