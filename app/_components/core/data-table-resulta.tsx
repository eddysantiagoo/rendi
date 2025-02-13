"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileSpreadsheet, Search } from "lucide-react";
import * as XLSX from "xlsx";
import { Investment } from "./interfaces/Investment";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  depositRaw: number;
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  depositRaw,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  const handleExport = (depositRaw: number) => {
    const currencyFormat = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    });

    const title = [
      "Rendimientos a 1 mes - " + currencyFormat.format(depositRaw),
    ];
    const headers = ["Día", "Saldo", "Rendimientos", "Retenciones"];

    const rows = table.getRowModel().rows.map((row) =>
      row
        .getVisibleCells()
        .slice(1)
        .map((cell, index) => {
          const value = cell.getValue();
          return index > 0 && typeof value === "number"
            ? currencyFormat.format(value)
            : value;
        })
    );

    const worksheet = XLSX.utils.aoa_to_sheet([title, [], headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: "A1" });
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } },
    ];

    XLSX.writeFile(workbook, "Rendimientos - Rendi.xlsx");
  };

  return (
    <div className="max-w-[20rem] md:max-w-full overflow-x-auto">
      <div className="inline-flex gap-2 w-full items-center justify-end py-4">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => handleExport(depositRaw)}
        >
          Exportar a Excel
        </Button>
        <div className="relative flex">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"></Search>
          <Input
            type="search"
            autoFocus
            placeholder="Buscar por dia"
            value={(table.getColumn("day")?.getFilterValue() as number) ?? ""}
            onChange={(event) =>
              table.getColumn("day")?.setFilterValue(event.target.value)
            }
            className="max-w-sm pl-8"
          />
        </div>
      </div>
      <section className="flex [&>div]:max-h-[60vh] md:[&>div]:max-h-[28rem]">
        <Table className="border-separate border-spacing-0">
          <TableHeader className="sticky -top-1 z-10 bg-background/70 backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      style={{ width: header.getSize() }}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-3 px-4" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>
                <div className="text-left">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(data.reduce((total, item) => (item as Investment).finalAmount, 0))}
                </div>
              </TableCell>
              <TableCell className="text-left">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  data.reduce((total, item) => total + (item as Investment).ganancias, 0)
                )}
              </TableCell>
              <TableCell
                className={`text-left ${
                  data.reduce((total, item) => total + (item as Investment).retention, 0) > 1
                    ? "text-red-500"
                    : ""
                }`}
              >
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  data.reduce((total, item) => total + (item as Investment).retention, 0)
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </div>
  );
}
