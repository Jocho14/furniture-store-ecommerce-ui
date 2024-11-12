import { ColumnDef } from "@tanstack/react-table";

import { enableAdvancedHeader, formatCurrency } from "@/utils/table/formats";
import { createBaseColumn } from "@/config/table/baseColumn";
import { OrderData } from "./TData";
import { useNavigate } from "react-router-dom";

export const columns: ColumnDef<OrderData>[] = [
  createBaseColumn<OrderData>(),
  {
    accessorKey: "status",
    header: ({ column }) => enableAdvancedHeader(column, column.id),
    cell: ({ row }) => {
      const navigate = useNavigate();
      const handleClick = () => {
        navigate(`/employee/order/${row.original.id}/manage`);
      };

      return (
        <div
          className="flex flex-row items-center gap-3 cursor-pointer"
          onClick={handleClick}
        ></div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => enableAdvancedHeader(column, column.id),
    cell: ({ row }) => formatCurrency(row, "price", "PLN"),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => enableAdvancedHeader(column, column.id),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("amount")} <span> zł</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => enableAdvancedHeader(column, column.id),
    cell: ({ row }) => {
      return <div>{row.getValue("date")}</div>;
    },
  },
];

// Status: canceled, failed, success
// email
// Total price
// Date
