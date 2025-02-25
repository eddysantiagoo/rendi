import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Zap } from "lucide-react";

export default function DialogFormula() {
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
          ¿Cómo se calculan los rendimientos?
        </Badge>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            ¿Cómo se calculan los rendimientos?
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <section className="mb-4">
                  En nuestra calculadora, los rendimientos se estiman utilizando
                  el interés compuesto, que es la forma en que los bancos suelen
                  calcular los intereses de ahorro. Aquí te explicamos paso a
                  paso cómo lo hacemos:
                </section>

                <h4 className="font-bold mb-2 text-white">1. Tasa Efectiva Anual (EA):</h4>
                <div className="mb-4">
                  Cada banco informa una Tasa Efectiva Anual (EA), que
                  representa el rendimiento total que obtendrías en un año si
                  reinvirtieras tus ganancias. Nosotros tomamos esta tasa y la
                  convertimos a una tasa efectiva mensual.
                </div>

                <h4 className="font-bold mb-2  text-white">
                  2. Conversión a Tasa Efectiva Mensual:
                </h4>
                <div className="mb-4">
                  Para calcular cuánto ganas cada mes, convertimos la tasa EA en
                  una tasa efectiva mensual usando la siguiente fórmula:
                </div>
                <div className="mb-4">
                  <code className="bg-gray-700 text-white px-2 py-1 rounded">
                    r = (1 + EA)^(1/12) - 1
                  </code>
                </div>
                <div className="mb-4">Donde:</div>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    <code className="bg-gray-700 text-white px-1 rounded">
                      r
                    </code>{" "}
                    es la tasa efectiva mensual.
                  </li>
                  <li>
                    <code className="bg-gray-700 text-white px-1 rounded">
                      EA
                    </code>{" "}
                    es la tasa efectiva anual en decimal.
                  </li>
                </ul>

                <h4 className="font-bold mb-2  text-white">
                  3. Cálculo de Interés Compuesto:
                </h4>
                <div className="mb-4">
                  Una vez que tenemos la tasa mensual (
                  <code className="bg-gray-700 text-white px-1 rounded">r</code>
                  ), calculamos el monto final (
                  <code className="bg-gray-700 text-white px-1 rounded">A</code>
                  ) después de los meses que seleccionaste usando la fórmula de
                  interés compuesto:
                </div>
                <div className="mb-4">
                  <code className="bg-gray-700 text-white px-2 py-1 rounded">
                    A = P * (1 + r)^t
                  </code>
                </div>
                <div className="mb-4">Donde:</div>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    <code className="bg-gray-700 text-white px-1 rounded">
                      A
                    </code>{" "}
                    es el monto final.
                  </li>
                  <li>
                    <code className="bg-gray-700 text-white px-1 rounded">
                      P
                    </code>{" "}
                    es el monto que vas a depositar (capital inicial).
                  </li>
                  <li>
                    <code className="bg-gray-700 text-white px-1 rounded">
                      r
                    </code>{" "}
                    es la tasa efectiva mensual (en decimal).
                  </li>
                  <li>
                    <code className="bg-gray-700 text-white px-1 rounded">
                      t
                    </code>{" "}
                    es la cantidad de meses.
                  </li>
                </ul>

                <h4 className="font-bold mb-2  text-white">4. Rendimiento Generado:</h4>
                <div className="mb-4">
                  Para saber cuánto has ganado, restamos el capital inicial (
                  <code className="bg-gray-700 text-white px-1 rounded">P</code>
                  ) al monto final (
                  <code className="bg-gray-700 text-white px-1 rounded">A</code>
                  ):
                </div>
                <div className="mb-4">
                  <code className="bg-gray-700 text-white px-2 py-1 rounded">
                    Intereses = A - P
                  </code>
                </div>

                <h4 className="font-bold mb-2  text-white">
                  5. Retención en la Fuente (RTE FTE):
                </h4>
                <div className="mb-4">
                  En Colombia, existe una retención de impuestos sobre los
                  intereses ganados. Si los intereses mensuales superan un
                  umbral, se aplica una retención del 7%. El umbral se calcula a
                  partir de un limite diario de{" "}
                  <code className="bg-gray-700 text-white px-1 rounded">
                    $2.588,88 COP
                  </code>{" "}
                  por lo que al multiplicarse por 30 se obtiene el limite
                  mensual que seria{" "}
                  <code className="bg-gray-700 text-white px-1 rounded">
                    $77.666,40 COP
                  </code>
                  . Si los intereses superan esta cantidad se hace una retencion
                  del 7% sobre estos.
                </div>

                <h4 className="font-bold mb-2  text-white">
                  6. Monto Final Después de Retención:
                </h4>
                <div className="mb-4">
                  Finalmente, restamos la retención del monto final (
                  <code className="bg-gray-700 text-white px-1 rounded">A</code>
                  ) para obtener el monto que efectivamente recibes:
                </div>
                <div className="mb-4">
                  <code className="bg-gray-700 text-white px-2 py-1 rounded">
                    Monto Final = A - Retención
                  </code>
                </div>
                <div className="mb-4">
                  También calculamos el interes y retencion del primer mes,
                  simplemente aplicamos la misma formula anterior usando como
                  periodo 1 mes.
                </div>

                <div className="mt-4">
                  ¡Así de sencillo! Con estas fórmulas, puedes tener una buena
                  idea de cuánto crecerá tu dinero.
                </div>
              </div>
            </DialogDescription>
            <DialogFooter className="px-6 pb-6 sm:justify-start">
              <DialogClose asChild>
                <Button type="button">Okay</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
