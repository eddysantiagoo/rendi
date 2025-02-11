import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table-resulta";
import { columns } from "./columns-table-results";

// Función corregida para calcular la tabla de ganancias diarias
const generateSampleData = (
  deposit: number,
  interest: number,
  retention: number,
  finalAmountMonthlyRaw: number,
  days: number
) => {
  const data = [];
  const dailyInterest = interest / days;
  let currentBalance = deposit;

  for (let i = 1; i <= days; i++) {
    currentBalance += dailyInterest;

    data.push({
      day: i,
      value: currentBalance,
      ganancias: dailyInterest,
      retention: retention / 30,
      finalAmount: finalAmountMonthlyRaw,
    });
  }

  return data;
};

export const DialogDetails = ({
  interestsMonthlyRaw,
  depositRaw,
  monthlyRetention,
  finalAmountMonthlyRaw,
}: any) => {
  const sampleData = generateSampleData(
    depositRaw,
    interestsMonthlyRaw,
    monthlyRetention,
    finalAmountMonthlyRaw,
    30
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-emerald-200 p-2 text-black cursor-pointer">
          Detalles
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Ganancias diarias mensuales</DialogTitle>
          <DialogDescription>
            Este es un resumen de cómo crece tu inversión en 1 mes natural
          </DialogDescription>
        </DialogHeader>
        <div>
          <DataTable columns={columns} data={sampleData} />
        </div>
        <DialogFooter>
          <Button type="button">Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
