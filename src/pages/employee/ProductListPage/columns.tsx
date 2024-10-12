import { ColumnDef } from "@tanstack/react-table";

import { enableAdvancedHeader, formatCurrency } from "@/utils/table/formats";
import { createBaseColumn } from "@/config/table/baseColumn";
import { ProductData } from "./TData";

export const columns: ColumnDef<ProductData>[] = [
  createBaseColumn<ProductData>(),
  {
    accessorKey: "name",
    header: ({ column }) => enableAdvancedHeader(column, "Nazwa"),
  },
  {
    accessorKey: "price",
    header: ({ column }) => enableAdvancedHeader(column, "Cena"),
    cell: ({ row }) => formatCurrency(row, "price", "PLN"),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => enableAdvancedHeader(column, "Stan"),
  },
];
