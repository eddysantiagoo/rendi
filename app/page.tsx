"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Press_Start_2P } from "next/font/google"; // Load a pixelated font

const pixelFont = Press_Start_2P({ subsets: ["latin"], weight: "400" });

import CurrencyInput from "react-currency-input-field";
import Banks from "./_DATA/Banks";
import { CarouselBanks } from "./_components/core/CarrouselBanks";
import DialogEa from "./_components/core/DialogEa";
import { Header } from "./_components/core/Header";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "lucide-react";
import { Faq } from "./_components/core/Faq";

export default function Home() {
  const [amount, setAmount] = useState("1000000");
  const [months, setMonths] = useState("1");

  // Formatear valores en COP
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 1,
    }).format(value);
  };

  // Calcular retención en la fuente para Nubank
  const calculateRetention = (interests: number, months: number) => {
    const dailyThreshold = 2588.58; // Límite diario en COP
    const monthlyThreshold = dailyThreshold * 30; // Aproximado a 30 días

    // Solo se aplica retención si los intereses superan el umbral mensual
    if (interests > monthlyThreshold) {
      return interests * 0.07; // 7% de retención
    }

    return 0; // Si no supera el umbral, no hay retención
  };

  // Calcular rendimientos
  const calculateReturns = () => {
    if (!amount || !months || amount <= 0 || months <= 0) return [];

    return Banks.map((bank) => {
      const P = parseFloat(amount);
      const EA = bank.tasaEA / 100; // Convertimos EA a decimal
      const r = Math.pow(1 + EA, 1 / 12) - 1; // Cálculo correcto de tasa efectiva mensual
      const t = parseInt(months);

      const A = P * Math.pow(1 + r, t); // Monto final con interés compuesto
      const interests = A - P; // Rendimiento generado
      const retention = calculateRetention(interests, t); // Retención ajustada
      const finalAmount = A - retention; // Monto final después de retención

      return {
        ...bank,
        deposit: formatCurrency(P),
        finalAmount: formatCurrency(finalAmount),
        interests: formatCurrency(interests),
        interestsRaw: interests,
        retention: formatCurrency(retention),
      };
    });
  };

  // Función para calcular los datos de crecimiento de todos los bancos
  const calculateGrowthData = () => {
    if (!amount || !months || amount <= 0 || months <= 0) return [];

    const growthData = [];
    const P = parseFloat(amount); // Monto inicial
    const t = parseInt(months); // Número de meses

    // Calcular los datos de crecimiento para cada banco
    for (let month = 1; month <= t; month++) {
      const dataPoint = { month }; // Almacenar el mes actual

      // Calcular el valor final para cada banco
      Banks.forEach((bank) => {
        const EA = bank.tasaEA / 100; // Convertir tasa efectiva anual a decimal
        const r = Math.pow(1 + EA, 1 / 12) - 1; // Tasa mensual
        const A = P * Math.pow(1 + r, month); // Monto final para este mes
        dataPoint[bank.name] = A; // Guardar el valor final del banco
      });

      growthData.push(dataPoint); // Añadir los datos del mes a la lista
    }

    return growthData;
  };

  const isFormFilled = amount && months;

  return (
    <div className="place-content-center place-items-center space-y-12">
      <Header />

      <div className="rounded-xl gap-4 grid place-items-center w-full">
        <h1 className="w-fit px-4 py-2 rounded-lg text-[#00d992] text-5xl font-bold">
          Calcula los rendimientos
        </h1>
        <p className="font-medium text-md  px-4 py-2 rounded-full">
          En esta calculadora podras aproximar tus rendimientos con las
          diferentes cuentas de ahorro en Colombia.
        </p>
      </div>

      <section className="">
        <CarouselBanks />

        <DialogEa />
        <span className="text-sm float-right mr-1">
          Todas las tasas mostradas son en efectivo anual,{" "}
        </span>
      </section>

      <section className="grid grid-cols-2 w-full px-28 mb-12">
        {/* Inputs */}

        <div className="bg-neutral-900 flex flex-col p-12 gap-6 rounded-2xl w-full place-content-center">
          <Image
            className="mx-auto"
            src="/logo.png"
            alt="Logo"
            width={200}
            height={150}
          />

          <label className="text-white text-xl font-medium text-left">
            Valor
          </label>
          <CurrencyInput
            autoFocus
            prefix="$"
            placeholder=""
            value={amount}
            onValueChange={(value) => setAmount(value ?? "")}
            intlConfig={{ locale: "es-CO", currency: "COP" }}
            className="w-full p-6 rounded-lg bg-[#090d10] font-bold text-white focus:ring-2 focus:ring-blue-500 outline-none text-xl"
          />

          <div className="space-y-4 w-full">
            <Label htmlFor={months} className="text-xl">
              Meses <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={(value) => setMonths(value)}
              defaultValue="1"
            >
              <SelectTrigger
                id={months}
                className="w-full py-10 px-6 font-bold text-xl"
              >
                <SelectValue placeholder="Meses" />
              </SelectTrigger>
              <SelectContent className="text-xl">
                <SelectItem value="1">1 mes</SelectItem>
                <SelectItem value="2">2 meses</SelectItem>
                <SelectItem value="3">3 meses</SelectItem>
                <SelectItem value="4">4 meses</SelectItem>
                <SelectItem value="5">5 meses</SelectItem>
                <SelectItem value="6">6 meses</SelectItem>
                <SelectItem value="7">7 meses</SelectItem>
                <SelectItem value="8">8 meses</SelectItem>
                <SelectItem value="9">9 meses</SelectItem>
                <SelectItem value="10">10 meses</SelectItem>
                <SelectItem value="11">11 meses</SelectItem>
                <SelectItem value="12">12 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resultados */}
        <div className="p-6 border border-neutral-900 rounded-2xl">
          <div className="py-4 flex flex-col gap-4">
            <h1 className="text-center  text-2xl font-bold">Resultados</h1>
            <div className="flex gap-4">
              <div className="flex-grow flex px-4 py-2 gap-2 flex-col bg-[#122322] text-[#00d992] rounded-md hover:opacity-70 transition-all hover:scale-105">
                <h3 className="font-medium">Deposito</h3>
                <span className="font-semibold">{formatCurrency(amount)}</span>
              </div>
              <div className="flex-grow flex px-4 py-2 gap-2 flex-col bg-[#122322] text-[#00d992] rounded-md hover:opacity-70 transition-all hover:scale-105">
                <h3 className="font-medium">Meses</h3>
                <span className="font-semibold">
                  {`${months || "0"} mes(es)`}{" "}
                </span>
              </div>
            </div>
          </div>

          <div className=" max-h-[500px] overflow-y-auto">
            {isFormFilled ? (
              calculateReturns()
                .sort((a, b) => (b.interestsRaw || 0) - (a.interestsRaw || 0)) // Sorting based on raw 'interests' value
                .map((bank, index) => (
                  <div
                    key={index}
                    className="bg-[#0a0a0a] border-[1px] border-neutral-800 p-4 flex items-center justify-between rounded-lg mb-4 resultShowItem"
                  >
                    <article>
                      <div className="flex gap-4 items-center">
                        <Image
                          src={bank.image}
                          alt={bank.name}
                          width={50}
                          height={50}
                          className="rounded-lg"
                        />
                        <div className="flex flex-col">
                          <h2 className="text-white text-lg font-medium">
                            {bank.name}
                          </h2>
                          <div className="flex gap-2 items-center">
                            <span className="text-xl text-[#00d992] font-bold">
                              {bank.finalAmount}
                            </span>

                            {parseFloat(
                              bank.retention.replace(/[^0-9.-]+/g, "")
                            ) > 1 && (
                              <span className="text-red-400 text-sm">
                                (Se aplica RTE FTE: {bank.retention})
                              </span>
                            )}
                          </div>
                          <p className="text-yellow-400">
                            Tu dinero habría crecido: {bank.interests}
                          </p>
                        </div>
                      </div>
                    </article>

                    <article className="bg-[#122322] text-[#00d992] px-4 py-2 rounded-md text-sm font-bold z-10">
                      {bank.tasaEA}%
                    </article>
                  </div>
                ))
            ) : (
              <div className="text-center text-gray-500">
                Ingresa un monto y número de meses para calcular los
                rendimientos
                <div className="mt-4 flex justify-center items-center p-4 rounded-lg">
                  <Image
                    className="bg-neutral-900 rounded-full p-4 hover:scale-110 transition-all"
                    src="/money-bag.png"
                    alt="Empty"
                    width={100}
                    height={200}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="p-6 px-28 w-full flex place-content-center">
        <div className="relative flex items-center gap-6 p-4">
          <div className="bg-[#0a0a0a] border-4relative">
            <Image src="/eddy.png" alt="Character" width={100} height={150} />
          </div>

          <div
            className={`${pixelFont.className} relative bg-[#fef4e8] text-black p-4 text-sm max-w-xs border-4 border-black pixel-border`}
          >
            "guarda tus monedas! 💰"
            <div className="absolute -left-4 bottom-4 w-6 h-6 bg-[#fef4e8] border-black border-l-4 border-b-4"></div>
          </div>
        </div>
      </section>

      <section className="p-6 px-28 w-full">
        <Faq />
      </section>
    </div>
  );
}
