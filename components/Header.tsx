import Image from "next/image";
import Link from "next/link";
function Header() {
  return (
    <header className="flex p-5 justify-between items-center sticky top-0 z-50 bg-white shadow-md">
      {/* left */}
      <div className="flex space-x-2 items-center">
        <Link href="/">
          <Image
            src="https://devnote.tech/wp-content/uploads/2022/07/sagemaker-icon.png"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>

        <div>
          <h1 className="text-2xl text-black font-bold">
            Gambar<span className="text-orange-500">in</span> Gue!
          </h1>
          <h2 className="text-black text-s">
            Powered by AWS SageMaker and StableDiffusion 2.1
          </h2>
        </div>
      </div>

      {/* right */}
      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        {/* <button type='button' className="px-4 font-bold text-right">My Images</button> */}
        <Link href="/my-images" className="px-2 font-bold text-right">
          My Images
        </Link>
        <Link
          href="https://github.com/tugusav/gambarin-gue"
          className="px-2 font-bold text-right"
        >
          Github Repo
        </Link>
        <div className="px-5">
          <Link href="/profile"
           className="px-2 font-bold text-right"
          >Profile</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
