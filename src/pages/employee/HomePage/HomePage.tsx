import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Plus } from "iconoir-react";

const HomePage = () => {
  return (
    <div className="flex justify-around">
      <Link to="/employee/product/add">
        <Button aria-label="add product" variant="outline" className="flex">
          <Plus /> Add product
        </Button>
      </Link>
      <Link to="/employee/product/list">
        <Button aria-label="product list" variant="outline" className="flex">
          Product List
        </Button>
      </Link>
      <Link to="/employee/order/list">
        <Button aria-label="order list" variant="outline" className="flex">
          Order List
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
