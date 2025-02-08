"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 rounded-b-3xl bg-black/20 backdrop-blur-md border border-neutral-700 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-70 transition">
          Rendi
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="ml-6 text-neutral-300 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="absolute top-12 left-0 right-0 border-t border-neutral-600 p-4 bg-black/80 rounded-xl backdrop-blur-md">
          <ul className="flex flex-col space-y-4 text-neutral-300 rounded-b-full">
            <li>
              <Link
                href="/"
                className="block hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/terminos-y-condiciones"
                className="block hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                Términos y Condiciones
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
