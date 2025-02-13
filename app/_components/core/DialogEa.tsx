import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Landmark, Zap } from "lucide-react";

export default function DialogEa() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge className="gap-1 bg-transparent border border-emerald-400 text-white py-1 px-2 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.03] duration-120">
          <Zap
            className="-ms-0.5 opacity-60"
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />
          ¿Qué es la Tasa Efectiva Anual?
        </Badge>
      </DialogTrigger>
      <DialogContent className="max-w-sm ">
        <div className="mb-2 flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <Landmark />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Entiende la tasa efectiva anual
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Todas las tasas mostradas son tasas efectiva anual, lo que
              significa que no corresponden a tasas mensuales, sino a un cálculo
              que refleja el rendimiento acumulado durante todo un año con
              interés compuesto.
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
