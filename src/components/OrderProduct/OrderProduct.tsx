import React from "react";
import styles from "./styles.module.scss";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderProductProps {
  thumbnailUrl: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderProduct: React.FC<OrderProductProps> = ({
  name,
  thumbnailUrl,
  price,
  quantity,
}) => {
  return (
    <div className={styles["order-product"]}>
      <Card>
        <CardContent>
          <div className="flex flex-col">
            <img src={thumbnailUrl} alt={name} className="w-[50px] h-[50px]" />
            <p>{name}</p>
            <p>{price}zł</p>
          </div>
          <p>{quantity}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderProduct;
