import { DataTable } from "@/components/ui/dataTable/data-table";

import { columns } from "./columns";
import { ProductData } from "./TData";

function getData(): ProductData[] {
  return [
    {
      id: "712f",
      name: "krzesło",
      price: 100,
      quantity: 200,
    },
    {
      id: "7412f",
      name: "szafa",
      price: 150,
      quantity: 100,
    },
    {
      id: "7122f",
      name: "kanapa",
      price: 190,
      quantity: 300,
    },
    {
      id: "7122f",
      name: "kanapa",
      price: 190,
      quantity: 300,
    },
    {
      id: "7122f",
      name: "kanapa",
      price: 190,
      quantity: 300,
    },
    {
      id: "7122f",
      name: "kanapa",
      price: 190,
      quantity: 300,
    },
    {
      id: "7122f",
      name: "kanapa",
      price: 190,
      quantity: 300,
    },
  ];
}

const ProductListPage = () => {
  const data = getData();
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default ProductListPage;
