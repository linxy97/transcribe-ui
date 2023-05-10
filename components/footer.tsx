import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-around z-10 bg-white pb-2">
      <Link href="https://vercel.com">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={100}
          height={24}
          priority
        />
      </Link>
      <code className="flex items-center justify-center">
        Made by @Linxy
      </code>
      <Link href="https://github.com/" className="flex items-center ">
        <Image
          src="/github.svg"
          alt="GitHub Logo"
          width={24}
          height={24}
          priority
        />
        <p className="font-light">Source</p>
      </Link>
    </div>
  );
};

export default Footer;
