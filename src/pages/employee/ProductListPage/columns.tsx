import { ColumnDef } from "@tanstack/react-table";

import { enableAdvancedHeader, formatCurrency } from "@/utils/table/formats";
import { createBaseColumn } from "@/config/table/baseColumn";
import { ProductData } from "./TData";
import exampleImage from "@/assets/images/1_1.webp";

export const columns: ColumnDef<ProductData>[] = [
  createBaseColumn<ProductData>(),
  {
    accessorKey: "name",
    header: ({ column }) => enableAdvancedHeader(column, "Nazwa"),
    cell: ({ row }) => (
      <div className="flex flex-row items-center">
        <img
          className="w-[50px] aspect-square"
          src={row.original.thumbnail}
          alt={row.original.alt}
        />
        <span>{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => enableAdvancedHeader(column, "Cena"),
    cell: ({ row }) => formatCurrency(row, "price", "PLN"),
  },
  //   {
  //     accessorKey: "quantity",
  //     header: ({ column }) => enableAdvancedHeader(column, "Stan"),
  //     cell: ({ row }) => row.getValue("quantity") + " szt.",
  //   },
];
