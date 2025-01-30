import { ModeToggle } from "@/components/mode-toggle";
import { CardBank } from "./_components/Bank/CardBank";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

const banksInfo = [
  { name: "Banco Azteca", tase: 4.5 },
  { name: "BanCoppel", tase: 4.5 },
  { name: "Banorte", tase: 4.5 },
  { name: "BBVA", tase: 4.5 },
  { name: "Bancolombia", tase: 13 },
];

export default function Home() {
  return (
    <div className=" place-content-center place-items-center px-48">
      <ModeToggle />
      <h1 className="text-2xl bg-[#122322] text-[#00d992] py-2 px-6 my-2 rounded-md font-bold">
        Calcula los rendimientos
      </h1>
      <p>Para tus cuentas de ahorro</p>

      <div className="flex w-full my-12">
        {banksInfo.map((banksInfo, index) => (
          <CardBank key={index} {...banksInfo} />
        ))}
      </div>

      <section className="grid grid-cols-2 w-full">
        <div className="bg-neutral-900 flex flex-col p-12">
          <div>
            <Label htmlFor={"mijo"}>Monto</Label>
            <Input autoFocus id={"mijo"} placeholder="Email" type="email" />
            <p
              className="mt-2 text-xs text-muted-foreground"
              role="region"
              aria-live="polite"
            >
              Es el monto que deseas invertir
            </p>
          </div>
          <div>
            <Label htmlFor={"mijo"}>Meses</Label>
            <Input id={"mijo"} placeholder="Email" type="email" />
            <p
              className="mt-2 text-xs text-muted-foreground"
              role="region"
              aria-live="polite"
            >
              Es el tiempo en que tendras tu dinero invertido
            </p>
          </div>
        </div>

        <div className="p-2 border border-neutral-900">
          <h1 className="text-center text-2xl font-bold">Resultados</h1>

          <div className="p-12">
            {banksInfo.map((banksInfo, index) => (
              <CardBank key={index} {...banksInfo} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
