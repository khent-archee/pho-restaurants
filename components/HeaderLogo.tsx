export default function Logo() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-merri font-bold text-orange-600">
        Pho Restaurants
      </p>
      <p className="w-11/12 relative text-xs text-center text-gray-500 before:absolute before:top-1/2 before:left-0 before:w-1/12 before:h-[1px] before:bg-black before:content-[''] before:-translate-y-1/2 after:absolute after:top-1/2 after:right-0 after:w-1/12 after:h-[1px] after:bg-black after:content-[''] after:-translate-y-1/2">
        Find your next meal
      </p>
    </div>
  );
}
