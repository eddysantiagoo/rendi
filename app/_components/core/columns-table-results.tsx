"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ArrowDownUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Investment } from "./interfaces/Investment";

const exactNumberFilter: FilterFn<any> = (row, columnId, value) => {
  const cellValue = row.getValue(columnId);
  return Number(cellValue) === Number(value);
};

export const columns: ColumnDef<Investment>[] = [
  {
    id: "select",
    size: 30,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select Row"
      />
    ),
  },
  {
    accessorKey: "day",
    size: 0,
    header: "Día",
    filterFn: exactNumberFilter,
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <div className="inline-flex w-full items-center justify-between">
        Saldo
        <Button
          variant="ghost"
          size={"icon"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowDownUp className="h-4 w-fit" />
        </Button>
      </div>
    ),
    cell: (cell) => {
      return (
        <div>
          {cell.getValue<number>().toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "ganancias",
    header: "Rendimientos",
    cell: (cell) => {
      return (
        <div className="flex items-center gap-1 text-[#00d992]">
          {cell.getValue<number>().toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "retention",
    header: "Retenciones",
    cell: (cell) => {
      const value = cell.getValue<number>();
      const colorClass = value > 0 ? "text-red-500" : "text-[#00d992]";

      return (
        <div className={`flex items-center gap-1 ${colorClass}`}>
          {value.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })}
        </div>
      );
    },
  },
];
