import { DataTableColumnHeader } from "@/components/ui/dataTable/data-table-column-header";

const getCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatCurrency = (row: any, rowName: string, currency: string) => {
  const parsedAmount = parseFloat(row.getValue(rowName));
  const formatted = getCurrency(parsedAmount, currency);
  return formatted;
};

export const enableAdvancedHeader = (column: any, title: string) => {
  return <DataTableColumnHeader column={column} title={title} />;
};
