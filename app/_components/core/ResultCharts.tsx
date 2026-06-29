"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TrendingUp, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const chartConfig = {
  balance: {
    label: "Saldo Total",
    color: "#00d992",
  },
  returns: {
    label: "Rendimiento",
    color: "#00d992",
  },
} satisfies ChartConfig;

interface ResultChartsProps {
  chartData: any[];
  comparisonData: any[];
}

/**
 * Sección de gráficos del home. Vive en su propio componente para poder
 * cargarse con `next/dynamic` y mantener `recharts` + `framer-motion` fuera
 * del bundle inicial (solo se descargan cuando ya hay resultados que graficar).
 */
export function ResultCharts({ chartData, comparisonData }: ResultChartsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 w-full px-4 xl:px-28">
      {/* Gráfico de Comparación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-background/40 backdrop-blur-xl shadow-lg"
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#00d992]/10 blur-3xl pointer-events-none" />
        <div className="relative p-5 md:p-6">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="text-[#00d992]" size={16} />
            <h3 className="text-sm font-semibold text-foreground">
              Comparación Top 5 Bancos
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Rendimientos netos de los mejores bancos
          </p>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart
              data={comparisonData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666" }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis hide domain={["auto", "auto"]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="returns" fill="#00d992" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </motion.div>

      {/* Gráfico de Crecimiento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-background/40 backdrop-blur-xl shadow-lg"
      >
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#00d992]/10 blur-3xl pointer-events-none" />
        <div className="relative p-5 md:p-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="text-[#00d992]" size={16} />
            <h3 className="text-sm font-semibold text-foreground">
              Proyección de Crecimiento
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Evolución del saldo con el mejor banco
          </p>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666" }}
                interval={Math.floor(chartData.length / 5)}
              />
              <YAxis hide domain={["dataMin - 10000", "auto"]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#00d992"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBalanceSavings)"
              />
              <defs>
                <linearGradient
                  id="colorBalanceSavings"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#00d992" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00d992" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ChartContainer>
        </div>
      </motion.div>
    </section>
  );
}
