import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12 px-6 rounded-2xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Image src="/logo.png" alt="elmony" width={120} height={30} />
          <p className="text-sm text-neutral-400 mt-2">
            Optimiza tus ahorros y descubre cuánto puedes ganar con las mejores
            tasas en Colombia 🚀
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <h3 className="font-semibold text-lg">Legal</h3>
          <Link
            href="/terminos-y-condiciones"
            className="text-neutral-400 hover:text-white transition"
          >
            Terminos y condiciones
          </Link>
        </div>

        <div className="relative w-full max-w-sm rounded-xl overflow-hidden bg-neutral-800 text-white shadow-lg">
          <div className="h-20 bg-neutral-600"></div>

          <div className="px-6 py-4 relative flex items-center">
            <div className="absolute -top-10 left-4 w-24 h-24 rounded-full overflow-hidden border-2 border-neutral-900 flex items-center justify-center bg-[#ffba34]">
              <Image src="/eddy.png" alt="Your Name" width={60} height={60} />
            </div>

            <div className="absolute right-0 w-24 h-24 rounded-full">
              <Link
                className="text-white bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-transparent border border-transparent hover:border-blue-500 transition"
                target="_blank"
                href="https://eddyy.dev/"
              >
                Follow
              </Link>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold">@EddySantiago</h3>
              <p className="text-sm text-neutral-400">El progenitor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-700 pt-6 text-sm text-center text-neutral-500 flex justify-center">
        <Image src="/hends.png" alt="Hands" width={50} height={30} />
      </div>
    </footer>
  );
};
