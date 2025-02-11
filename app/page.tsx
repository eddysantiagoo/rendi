"use client";

import { useEffect, useId, useState } from "react";
import { Press_Start_2P } from "next/font/google";

const pixelFont = Press_Start_2P({ subsets: ["latin"], weight: "400" });

import CurrencyInput from "react-currency-input-field";
import { Banks, DepositosBajoMonto } from "./_DATA/Banks";
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
import { Switch } from "@/components/ui/switch";
import { Info, TriangleAlert, Zap } from "lucide-react";
import { Faq } from "./_components/core/Faq";
import { Footer } from "./_components/core/Footer";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const id = useId();
  const [amount, setAmount] = useState("1000000");
  const [months, setMonths] = useState("1");
  const [isChecked, setChecked] = useState(false);
  const [displayedBanks, setDisplayedBanks] = useState(Banks);
  const [limit, setLimit] = useState(false);

  useEffect(() => {
    if (parseFloat(amount) >= 10482689) {
      setLimit(true);
      setDisplayedBanks(Banks);
    } else {
      setLimit(false);
      setDisplayedBanks(isChecked ? [...Banks, ...DepositosBajoMonto] : Banks);
    }
  }, [amount, isChecked]);

  // Formatear valores en COP
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 1,
    }).format(value);
  };

  const calculateRetention = (interests: number) => {
    const dailyThreshold = 2588.58; //Limite diario para retención
    const monthlyThreshold = dailyThreshold * 30;

    if (interests > monthlyThreshold) {
      return interests * 0.07; // 7% de retención
    }

    return 0; // Si no supera el umbral, no hay retención
  };

  // Calcular rendimientos
  const calculateReturns = () => {
    if (!amount || !months || parseFloat(amount) <= 0 || parseInt(months) <= 0)
      return [];

    return displayedBanks.map((bank) => {
      const P = parseFloat(amount);
      const EA = bank.tasaEA / 100; // Convertimos EA a decimal
      const r = Math.pow(1 + EA, 1 / 12) - 1; // Cálculo correcto de tasa efectiva mensual
      const t = parseInt(months);

      const A = P * Math.pow(1 + r, t); // Monto final con interés compuesto
      const interests = A - P; // Rendimiento generado
      const retention = calculateRetention(interests); // Retención ajustada
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
  // const calculateGrowthData = () => {
  //   if (!amount || !months || amount <= 0 || months <= 0) return [];

  //   const growthData = [];
  //   const P = parseFloat(amount); // Monto inicial
  //   const t = parseInt(months); // Número de meses

  //   // Calcular los datos de crecimiento para cada banco
  //   for (let month = 1; month <= t; month++) {
  //     const dataPoint = { month }; // Almacenar el mes actual

  //     // Calcular el valor final para cada banco
  //     Banks.forEach((bank) => {
  //       const EA = bank.tasaEA / 100; // Convertir tasa efectiva anual a decimal
  //       const r = Math.pow(1 + EA, 1 / 12) - 1; // Tasa mensual
  //       const A = P * Math.pow(1 + r, month); // Monto final para este mes
  //       dataPoint[bank.name] = A; // Guardar el valor final del banco
  //     });

  //     growthData.push(dataPoint); // Añadir los datos del mes a la lista
  //   }

  //   return growthData;
  // };

  const isFormFilled = amount && months;

  return (
    <div className="min-h-screen text-white flex flex-col items-center space-y-12">
      <Header />
      <div className="rounded-xl gap-4 grid place-items-center w-full text-center px-4">
        <article className="flex flex-col">
          <h1 className="w-fit rounded-lg text-[#00d992] text-3xl md:text-5xl font-bold">
            Haz rendir tu dinero
          </h1>
        </article>
        <p className="font-medium text-sm md:text-md px-4 py-2 rounded-full">
          En esta calculadora podrás aproximar tus rendimientos con las
          diferentes cuentas de ahorro y depósitos de bajo monto en Colombia.
        </p>
      </div>

      <div className="place-content-center place-items-center w-full overflow-hidden">
        <CarouselBanks />
      </div>

      <section className="flex flex-col md:flex-row items-center  gap-4 text-center text-neutral-400">
        <span className="text-sm">
          Todas las tasas mostradas son en efectivo anual
        </span>
        <DialogEa />
      </section>

      <section className="grid gap-2 md:gap-0 md:flex w-full px-2 xl:px-28 mb-12">
        {/* Inputs */}

        <div className="bg-neutral-900 flex flex-col p-4 md:p-8 gap-6 rounded-2xl md:w-1/2 place-content-center overflow-auto">
          <Image
            className="mx-auto"
            src="/logo.png"
            alt="Logo"
            width={100}
            height={50}
          />
          <div className="mx-auto">
            <Badge variant="outline" className="gap-1.5 border-neutral-500">
              <span
                className="size-2 rounded-full bg-[#00d992]"
                aria-hidden="true"
              ></span>
              Alfa
            </Badge>
          </div>

          <label className="text-white text-xl font-medium text-left">
            Valor
          </label>
          <CurrencyInput
            prefix="$"
            placeholder=""
            value={amount}
            onValueChange={(value) => setAmount(value ?? "")}
            intlConfig={{ locale: "es-CO", currency: "COP" }}
            className="w-full p-4 rounded-lg bg-[#090d10] font-bold text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg"
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
                className="w-full py-6 px-4 font-bold text-md"
              >
                <SelectValue placeholder="Meses" />
              </SelectTrigger>
              <SelectContent>
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

          <div className="flex flex-col w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
            {/* <Switch
              id={id}
              checked={isChecked}
              onCheckedChange={(checked) => setChecked(checked)}
              className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
              aria-describedby={`${id}-description`}
            /> */}

            <Badge className="rounded w-fit bg-[#090d10] text-white borde border-emerald-500 ">
              Nuevo
            </Badge>
            <div className="grid grow gap-2 w-full">
              <article className="flex justify-between items-center">
                <Label htmlFor={id}>Incluir depositos de bajo monto</Label>
                <Switch
                  id={id}
                  aria-describedby={`${id}-description`}
                  checked={isChecked}
                  onCheckedChange={(checked) => setChecked(checked)}
                />
              </article>
              <p
                id={`${id}-description`}
                className="text-xs text-muted-foreground"
              >
                Se incluirán los depósitos de bajo monto para el cálculo de los
                resultados
              </p>
            </div>
          </div>

          {isChecked ? (
            <>
              <div className="rounded-lg border border-border px-4 py-3 resultShowItem">
                <div className="flex gap-3">
                  <Info
                    className="-mt-0.5 inline-flex text-blue-500"
                    size={28}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col grow justify-between gap-4">
                    <p className="text-normal font-medium">
                      El limite para los depositos de bajo monto es de
                      $10.482.689 pesos (210,50 UVT)
                    </p>

                    <p className="text-sm text-neutral-400">
                      Si digitas un valor mayor a este, el sistema no tendrá en
                      cuenta los depositos de bajo monto.
                    </p>
                  </div>
                </div>
              </div>

              {limit ? (
                <div className="rounded-lg border border-amber-500/50 px-4 py-3">
                  <div className="flex gap-3 ">
                    <TriangleAlert
                      className="mt-0.5 shrink-0 opacity-60 text-amber-600"
                      size={22}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <div className="flex grow justify-between gap-3">
                      <p className="text-sm">
                        Se están excluyendo los depósitos de bajo monto porque
                        superaste el límite
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <p></p>
          )}
        </div>

        {/* Resultados */}
        <div className="flex flex-col p-2 md:p-6 border border-neutral-900 rounded-2xl w-full bg-[#090d10] max-h-[700px] overflow-auto">
          <div className="py-4 flex flex-col gap-4">
            <h1 className="text-center text-2xl font-bold">Resultados</h1>
            <div className="flex flex-row gap-4 text-sm md:text-normal">
              <div className="flex-grow flex px-4 py-2 gap-2 flex-col bg-[#122322] text-[#00d992] rounded-md transition-all hover:scale-[1.02] duration-120">
                <h3 className="font-medium">Deposito</h3>
                <span className="font-semibold">
                  {formatCurrency(parseFloat(amount))}
                </span>
              </div>
              <div className="flex-grow flex px-4 py-2 gap-2 flex-col bg-[#122322] text-[#00d992] rounded-md transition-all hover:scale-[1.02] duration-120">
                <h3 className="font-medium">Meses</h3>
                <span className="font-semibold">
                  {`${months || "0"} mes(es)`}{" "}
                </span>
              </div>
            </div>
            <div className="w-full flex justify-center mt-2 md:hidden">
              <Badge className="gap-1 mx-auto">
                <Zap
                  className="-ms-0.5 opacity-60"
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Has scroll en los resultados para ver más
              </Badge>
            </div>
          </div>

          <div className="flex flex-col relative overflow-y-auto overflow-x-hidden">
            {isFormFilled ? (
              calculateReturns()
                .sort((a, b) => (b.interestsRaw || 0) - (a.interestsRaw || 0))
                .map((bank, index) => (
                  <div
                    key={index}
                    className="bg-[#0a0a0a] border border-neutral-800 p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all  hover:scale-[1.03] duration-120"
                  >
                    <article className="flex gap-4 items-center">
                      <Image
                        src={bank.image}
                        alt={bank.name}
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div className="flex flex-col">
                        <div className="flex gap-1 items-center">
                          <h2 className="text-white text-lg font-medium">
                            {bank.name}
                          </h2>
                          <p className="text-neutral-400 text-sm">
                            ({bank.type || "Cuenta de ahorros"})
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-xl text-[#00d992] font-bold">
                            {bank.finalAmount}
                          </span>
                          {parseFloat(
                            bank.retention.replace(/[^0-9.-]+/g, "")
                          ) > 1 && (
                            <span className="text-red-400 text-sm">
                              (RTE FTE: -{bank.retention})
                            </span>
                          )}
                        </div>
                        <p className="text-yellow-400 text-sm">
                          Tu dinero habrá crecido: {bank.interests}
                        </p>
                      </div>
                    </article>

                    <article className="bg-[#122322] text-[#00d992] px-4 py-2 rounded-md text-sm font-bold w-fit self-start md:self-auto">
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
        <div className="relative flex flex-col md:flex-row items-center gap-6 p-4">
          <div className="bg-[#0a0a0a] border-4relative bg-transparent">
            <Image src="/eddy.png" alt="Character" width={80} height={150} />
          </div>

          <div
            className={`${pixelFont.className} relative bg-[#fef4e8] text-black p-4 text-sm max-w-xs border-4 border-black pixel-border`}
          >
            "guarda tus monedas! 💰"
            <div className="absolute -left-4 bottom-4 w-6 h-6 bg-[#fef4e8] border-black border-l-4 border-b-4"></div>
          </div>
        </div>
      </section>
      <section className="p-6 md:px-28 w-full md:w-[70%]">
        <Faq />
      </section>
      <Footer />
    </div>
  );
}
