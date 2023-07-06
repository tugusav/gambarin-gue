import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    // create footer that contains author
    <footer className="bg-gray-200 text-black-500">
      <div className="flex flex-col space-y-2 p-3">
        <h1 className="text-l text-center font-bold">2023 © Tugus Avanindra - v1.0.0</h1>
        {/* include social media */}
        <div className="flex space-x-3 justify-center">
          <Link
            href="https://www.linkedin.com/in/tugusav/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/linkedin.png" width={30} height={30} alt="linkedin"/>         
          </Link>
          <Link
            href="https://github.com/tugusav"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/github.png" width={30} height={30} alt="github"/>
          </Link>
          <Link
            href="https://twitter.com/tugusav"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/twitter.png" width={30} height={30} alt="twitter"/>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
