import Image from "next/image";
import Link from "next/link";
// components/Header.js

export const Header = () => {
  return (
    <header className="sticky top-0 rounded-b-xl bg-black/20 backdrop-blur-md border border-neutral-800 z-50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4 mr-4">
          <Link href={"/"}>
            <Image src="/logo.png" alt="Logo" width={120} height={150} />
          </Link>
        </div>

        <nav className="flex space-x-6 text-neutral-300">
          <Link href="/" className="hover:text-white transition">
            Inicio
          </Link>
          <Link
            href={"/terminos-y-condiciones"}
            className="hover:text-white transition"
          >
            Terminos y Condiciones
          </Link>
        </nav>
      </div>
    </header>
  );
};
