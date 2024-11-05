import { ColumnDef } from "@tanstack/react-table";

import { enableAdvancedHeader, formatCurrency } from "@/utils/table/formats";
import { createBaseColumn } from "@/config/table/baseColumn";
import { ProductData } from "./TData";
import { useNavigate } from "react-router-dom";
import exampleImage from "@/assets/images/1_1.webp";

export const columns: ColumnDef<ProductData>[] = [
  createBaseColumn<ProductData>(),
  {
    accessorKey: "name",
    header: ({ column }) => enableAdvancedHeader(column, "Nazwa"),
    cell: ({ row }) => {
      const navigate = useNavigate();
      const handleClick = () => {
        navigate(`/employee/product/${row.original.id}/manage`);
      };

      return (
        <div
          className="flex flex-row items-center gap-3 cursor-pointer"
          onClick={handleClick}
        >
          <img
            className="w-[50px] aspect-square"
            src={row.original.thumbnail}
            alt={row.original.alt}
          />
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => enableAdvancedHeader(column, "Cena"),
    cell: ({ row }) => formatCurrency(row, "price", "PLN"),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => enableAdvancedHeader(column, "Stan"),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("quantity")} <span> szt.</span>
        </div>
      );
    },
  },
];
