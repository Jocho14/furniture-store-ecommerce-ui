import React, { useEffect } from "react";
import styles from "./styles.module.scss";

import {
  User,
  UserScan,
  Mail,
  DesignNib,
  BoxIso,
  DeliveryTruck,
  Phone,
} from "iconoir-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CollapsibleCard from "@/components/CollapsibleCard/CollapsibleCard";
import OrderProduct from "@/components/OrderProduct/OrderProduct";
import { getManagedOrderDetails } from "@/api/employee/orders";

interface OrderManagePageProps {}

const OrderManagePage: React.FC<OrderManagePageProps> = () => {
  const { id } = useParams<{ id: string }>();

  const { data: orderData, isLoading: orderDataLoading } = useQuery<any>({
    queryKey: ["orderDetailsManaged", id],
    queryFn: () => getManagedOrderDetails(Number(id)),
    enabled: !!id,
  });

  console.log("loading: ", orderDataLoading);

  return (
    <div className={styles["order-manage-page"]}>
      <Card>
        <CardHeader>
          <CardTitle className="flex ">
            <span className="mr-5">Order #{id}</span>
            <span className="mr-5">{orderData?.status}</span>
            <span>{orderData?.date}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CollapsibleCard
            title="Customer Details"
            icon={<User width={26} height={26} color="grey" />}
          >
            <div className="p-3 flex flex-col gap-2">
              <p className="flex">
                <DesignNib className="mr-2" color="grey" />{" "}
                <span className={styles["span-info"]}>Name:</span>
                {orderData?.customer.firstName} {orderData?.customer.lastName}
              </p>
              <p className="flex">
                <Mail className="mr-2" color="grey" />
                <span className={styles["span-info"]}>Email:</span>{" "}
                {orderData?.customer.email}
              </p>
              <p className="flex">
                <Phone className="mr-2" color="grey" />{" "}
                <span className={styles["span-info"]}>Phone number:</span>
                {orderData?.customer.phoneNumber}
              </p>
              <p className="flex">
                <UserScan className="mr-2" color="grey" />{" "}
                <span className={styles["span-info"]}>Type:</span>
                {orderData?.customer.type}
              </p>
            </div>
          </CollapsibleCard>
        </CardContent>
        <CardContent>
          <CollapsibleCard
            title="Order Details"
            icon={<BoxIso width={26} height={26} color="grey" />}
          >
            <div className="m-5">
              {orderData?.products?.map((product: any) => (
                <OrderProduct
                  name={product?.name}
                  price={product?.price}
                  thumbnailUrl={product?.thumbnailUrl}
                  quantity={product?.quantity}
                />
              ))}
            </div>
          </CollapsibleCard>
        </CardContent>
        <CardContent>
          <CollapsibleCard
            title="Shipping Details"
            icon={<DeliveryTruck width={26} height={26} color="grey" />}
          >
            <div className="p-3">
              <p>
                <span className={styles["span-info"]}>Street Address:</span>{" "}
                {orderData?.shipping.streetAddress}
              </p>
              <p>
                <span className={styles["span-info"]}>House Number:</span>{" "}
                {orderData?.shipping.houseNumber}
              </p>
              <p>
                <span className={styles["span-info"]}>
                  Apartment Number (optional):
                </span>
                {orderData?.shipping.apartmentNumber
                  ? orderData?.shipping.apartmentNumber
                  : "N/A"}
              </p>
              <p>
                <span className={styles["span-info"]}>Postal code:</span>{" "}
                {orderData?.shipping.postalCode}
              </p>
              <p>
                <span className={styles["span-info"]}>City:</span>{" "}
                {orderData?.shipping.city}{" "}
              </p>
            </div>
          </CollapsibleCard>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagePage;
