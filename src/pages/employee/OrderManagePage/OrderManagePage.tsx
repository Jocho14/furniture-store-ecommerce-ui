import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";

import { getManagedOrderDetails, cancelOrder } from "@/api/employee/orders";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CollapsibleCard from "@/components/CollapsibleCard/CollapsibleCard";
import OrderProduct from "@/components/OrderProduct/OrderProduct";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollArea";
import { useToast } from "@/components/hooks/use-toast";

import { useHeader } from "@/context/employee/HeaderContext";

import {
  User,
  UserScan,
  Mail,
  DesignNib,
  BoxIso,
  DeliveryTruck,
  Phone,
} from "iconoir-react";
import styles from "./styles.module.scss";

interface OrderManagePageProps {}

const OrderManagePage: React.FC<OrderManagePageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { setMode, setDeactivateFunction } = useHeader();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orderData } = useQuery<any>({
    queryKey: ["orderDetailsManaged", id],
    queryFn: () => getManagedOrderDetails(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    orderData?.status !== "pending"
      ? setMode("order-cancel-edit")
      : setMode("order-edit");
    setDeactivateFunction(() => handleDeactivate);
    return () => {
      setDeactivateFunction(() => {});
    };
  }, [orderData]);

  const mutationCancel = useMutation({
    mutationFn: () => cancelOrder(Number(id)),
    onSuccess: () => {
      toast({
        title: "Order canceled!",
        description: "Order has been successfully canceled",
      });
      queryClient.invalidateQueries({ queryKey: ["orderDetailsManaged", id] });
    },
    onError: (error) => {
      console.error("Error canceling order:", error);
    },
  });

  const handleDeactivate = async () => {
    mutationCancel.mutate();
  };

  return (
    <div className={styles["order-manage-page"]}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-5">Order #{id}</span>
            <span
              className={classNames(styles[`${orderData?.status}`], "mr-5")}
            >
              {orderData?.status}
            </span>
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
            <div className="m-1 mb-10">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="flex m-10">
                    {orderData?.products?.map((product: any) => (
                      <OrderProduct
                        key={product?.name}
                        name={product?.name}
                        price={product?.price}
                        thumbnailUrl={product?.thumbnailUrl}
                        quantity={product?.quantity}
                      />
                    ))}
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <div className="flex flex-col mt-10 ml-3">
                <div className="">Total</div>
                <div className="">Price: {orderData?.totalAmount}zł</div>
              </div>
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
