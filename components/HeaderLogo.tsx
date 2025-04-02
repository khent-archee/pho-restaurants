import { WEBSITE_NAME } from "@/app/cosntant";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative h-16 w-16 md:h-20 md:w-20">
        <Image
          src="/logo/logo.png"
          alt="logo"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-md md:text-xl font-bold text-primary">
          {WEBSITE_NAME}
        </p>
        <p className="w-11/12 relative text-xs text-center text-gray-500 md:before:absolute before:top-1/2 before:left-0 md:before:w-1/12 before:h-[1px] md:before:bg-black before:content-[''] md:before:-translate-y-1/2 md:after:absolute after:top-1/2 md:after:right-0 md:after:w-1/12 after:h-[1px] md:after:bg-black after:content-[''] md:after:-translate-y-1/2">
          Find your next meal
        </p>
      </div>
    </div>
  );
}
