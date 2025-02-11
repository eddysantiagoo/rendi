"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownUp, Ellipsis, Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Investment = {
  day: number;
  value: number;
  ganancias: number;
  finalAmount: number;
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
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <div className="inline-flex w-full items-center justify-between">
        Valor
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
  {
    id: "options",
    header: "Acciones",
    size: 10,
    cell: (cell) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Ellipsis></Ellipsis>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`/channels/`}>
                <Eye></Eye>
                Ver
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
