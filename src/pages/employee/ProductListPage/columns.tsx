import { ColumnDef } from "@tanstack/react-table";

import { enableAdvancedHeader, formatCurrency } from "@/utils/table/formats";
import { createBaseColumn } from "@/config/table/baseColumn";
import { ProductData } from "./TData";
import { useNavigate } from "react-router-dom";

export const columns: ColumnDef<ProductData>[] = [
  createBaseColumn<ProductData>(),
  {
    accessorKey: "name",
    header: ({ column }) => enableAdvancedHeader(column, column.id),
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
    header: ({ column }) => enableAdvancedHeader(column, column.id),
    cell: ({ row }) => formatCurrency(row, "price", "PLN"),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => enableAdvancedHeader(column, column.id),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("quantity")} <span> szt.</span>
        </div>
      );
    },
  },
];
