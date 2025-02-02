import Image from "next/image";
// components/Header.js

export const Header = () => {
  return (
    <header className="sticky top-0 rounded-b-xl bg-black/30 backdrop-blur-md border border-b-neutral-600 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </div>
    </header>
  );
};
