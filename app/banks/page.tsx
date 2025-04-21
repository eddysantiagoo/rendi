"use client";

import { motion } from "framer-motion";
import { Banks, DepositosBajoMonto } from "../_DATA/Banks";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../_components/core/Header";

export default function BanksPage() {
  const allBanks = [...Banks, ...DepositosBajoMonto];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Apple-like easing
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center mb-3">
            Entidades Financieras
          </h1>
          <p className="text-muted-foreground text-center max-w-md">
            Explora y compara las mejores tasas de interés en el mercado
            financiero
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allBanks.map((bank) => (
            <motion.div
              key={bank.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              className="rounded-2xl shadow-lg overflow-hidden border border-border "
            >
              <Link
                href={`/bank/${bank.name.toLowerCase()}`}
                className="block h-full"
              >
                {/* Header with backdrop blur similar to detail view */}
                <div className="relative h-32 backdrop-blur-md bg-white/50 dark:bg-black/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={bank.image}
                      alt={bank.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="backdrop-blur-md p-5 bg-background/100">
                  {/* Title section */}
                  <div className="flex flex-col items-center mb-4">
                    <h3 className="text-lg font-semibold text-foreground text-center">
                      {bank.name}

                      {bank.act && (
                        <span className="text-xs text-green-500 flex items-center mt-1">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Actualizado hace poco
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Rate card - matching the detailed view style */}
                  <div
                    className={`rounded-xl p-4 mb-4 ${
                      bank.act
                        ? "bg-green-500/10 border border-green-500/30"
                        : "bg-primary/10"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tasa EA</span>
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-xl font-bold ${
                            bank.act ? "text-green-500" : "text-primary"
                          }`}
                        >
                          {bank.tasaEA}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Call to action button - matching iOS style from detailed view */}
                  <button className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <span>Ver detalles</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
