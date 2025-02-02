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
import CurrencyInput from "react-currency-input-field";
import Banks from "./_DATA/Banks";
import { CarouselBanks } from "./_components/core/CarrouselBanks";
import DialogEa from "./_components/core/DialogEa";
import { Header } from "./_components/core/Header";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");

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

  return (
    <div className="place-content-center place-items-center space-y-12">
      <Header />

      <div className="rounded-xl gap-4 grid place-items-center w-full">
        <h1 className="bg-[#122322] w-fit px-4 py-2 rounded-lg text-[#00d992] text-4xl font-bold">
          Calcula los rendimientos
        </h1>
        <p className="font-medium text-sm">
          En esta calculadora podras aproximar tus rendimientos con las
          diferentes cuentas de ahorra en Colombia.
        </p>
      </div>

      <section className="">
        <CarouselBanks />

        <DialogEa />
        <span className="text-sm float-right mr-1">
          Todas las tasas mostradas son en efectivo anual,{" "}
        </span>
      </section>

      <section className="grid grid-cols-2 w-full px-28 ">
        {/* Inputs */}

        <div className="bg-neutral-900 flex flex-col p-12 gap-4 rounded-2xl">
          <label className="text-white text-sm font-medium">Amount (COP)</label>
          <CurrencyInput
            autoFocus
            prefix="$"
            onValueChange={(value) => setAmount(value ?? "")}
            intlConfig={{ locale: "es-CO", currency: "COP" }}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="text-white text-sm font-medium">Months</label>
          <input
            type="number"
            placeholder="Ingrese número de meses"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Resultados */}
        <div className="p-6 border border-neutral-900 rounded-2xl">
          <h1 className="text-center text-2xl font-bold">Resultados</h1>

          <div className="p-6">
            {calculateReturns().map((bank, index) => (
              <div key={index} className="bg-neutral-800 p-4 rounded-lg mb-4">
                <h2 className="text-white font-bold">{bank.name}</h2>
                <p className="text-blue-400">
                  💰 Habrías depositado: <strong>{bank.deposit}</strong>
                </p>
                <p className="text-green-400">
                  📈 En {months} mes(es) tendrías:{" "}
                  <strong>{bank.finalAmount}</strong>
                </p>
                <p className="text-yellow-400">
                  💸 Tu dinero habría crecido: <strong>{bank.interests}</strong>
                </p>
                <p className="text-red-400">
                  🔻 Total retención en la fuente:{" "}
                  <strong>{bank.retention}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
