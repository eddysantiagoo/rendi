import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Landmark, Mail } from "lucide-react";

export default function DialogEa() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-purple-400 cursor-pointer hover:underline hover:underline-offset-1 float-right">
          ¿Qué significa esto?
        </span>
      </DialogTrigger>
      <DialogContent>
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
