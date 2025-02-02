'use client';

import { useState } from "react";

const banksInfo = [
  { name: "Nu", tasaEA: 11 },
  { name: "Bancolombia", tasaEA: 0.05 },
];

export default function Home() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");

  // Formatear valores en COP
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 1,
    }).format(value);
  };

  // Calcular retención en la fuente para Nubank
  const calculateRetention = (interests, months) => {
    const dailyThreshold = 2588.58; // Límite diario de intereses sujetos a retención
    const monthlyThreshold = dailyThreshold * 30; // Aproximado a 30 días

    if (interests > monthlyThreshold * months) {
      return interests * 0.07; // Retención del 7% sobre los intereses
    }
    return 0;
  };

  // Calcular rendimientos
  const calculateReturns = () => {
    if (!amount || !months || amount <= 0 || months <= 0) return [];

    return banksInfo.map((bank) => {
      const P = parseFloat(amount);
      const EA = bank.tasaEA / 100;
      const r = Math.pow(1 + EA, 1 / 12) - 1; // Tasa efectiva mensual corregida
      const t = parseInt(months);
      const A = P * Math.pow(1 + r, t); // Monto final con interés compuesto
      const interests = A - P; // Rendimientos generados
      const retention = calculateRetention(interests, t); // Retención ajustada
      const finalAmount = A - retention; // Monto neto después de retención

      return {
        ...bank,
        deposited: formatCurrency(P),
        finalAmount: formatCurrency(finalAmount),
        interests: formatCurrency(interests),
        retention: formatCurrency(retention),
      };
    });
  };

  return (
    <div className="place-content-center place-items-center px-48">
      <h1 className="text-2xl bg-[#122322] text-[#00d992] py-2 px-6 my-2 rounded-md font-bold">
        Calcula los rendimientos
      </h1>
      <p>Para tus cuentas de ahorro</p>

      <section className="grid grid-cols-2 w-full my-12">
        {/* Inputs */}
        <div className="bg-neutral-900 flex flex-col p-12 gap-4 rounded-2xl">
          <label className="text-white text-sm font-medium">Monto (COP)</label>
          <input
            type="number"
            placeholder="Ingrese monto en COP"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="text-white text-sm font-medium">Meses</label>
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
              <div key={index}animate-show-popup className="bg-neutral-800 p-4 rounded-lg mb-4 animate-show-popup">
                <h2 className="text-white font-bold">{bank.name}</h2>
                <p className="text-gray-300">💰 Habrías depositado: <strong>{bank.deposited}</strong></p>
                <p className="text-green-400">📈 Monto final: <strong>{bank.finalAmount}</strong></p>
                <p className="text-yellow-400">💰 Tu dinero habría crecido: <strong>{bank.interests}</strong></p>
                <p className="text-red-400">🔻 Retención en la fuente: <strong>{bank.retention}</strong></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
