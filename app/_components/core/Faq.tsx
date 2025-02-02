import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  Accordion,
} from "../../../components/ui/accordion";
import { Bell, ChevronDown, LifeBuoy, Link2, ShieldCheck } from "lucide-react";

const items = [
  {
    id: "1",
    icon: Link2,
    title: "¿Que signfica RTE FTE?",
    content:
      "La Retención en la Fuente (RTE FTE) es un mecanismo de recaudo anticipado del impuesto sobre la renta en Colombia. En el caso de productos financieros como cuentas de ahorro y CDT, se aplica sobre los rendimientos generados por los ahorros o inversiones.",
  },
  {
    id: "2",
    icon: Bell,
    title: "¿Cuando se aplica la RTE FTE?",
    content:
      "Para las cuentas de ahorro, se aplica un porcentaje de retención en la fuente del 7% sobre los rendimientos que se generen; Para el año 2024 se aplica retención si los intereses generados superan el umbral diario de $2.588,88 COP.",
  },
];

export const Faq = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Preguntas frecuentes</h2>
      <Accordion type="single" collapsible className="w-full" defaultValue="1">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border"
                    aria-hidden="true"
                  >
                    <item.icon
                      size={16}
                      strokeWidth={2}
                      className="opacity-60"
                    />
                  </span>
                  <span className="flex flex-col space-y-1">
                    <span>{item.title}</span>
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="ms-3 pb-2 ps-10 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
