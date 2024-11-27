import React from "react";
import classNames from "classnames";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Xmark } from "iconoir-react";
import styles from "./styles.module.scss";

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
      <Card className="w-[180px] h-[200px]">
        <CardContent>
          <div className="flex flex-col items-center pt-5">
            <img src={thumbnailUrl} alt={name} className="w-[90px] h-[90px]" />
            <p>{name}</p>
           <div className="flex"><p className="mr-2">{price}zł </p><p className={styles["info-ghost"]}>per 1</p></div>
          </div>
        </CardContent>
        <CardFooter className={classNames(styles["card-footer"], "p-2 justify-center")}>
        <div className="flex items-center"><Xmark width={16} height={16}/><p>{quantity}</p></div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderProduct;
