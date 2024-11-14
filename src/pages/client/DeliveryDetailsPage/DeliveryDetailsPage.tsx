import React, { useRef } from "react";
import styles from "./styles.module.scss";

import {
  ShippingInfoForm,
  ShippingInfoFormHandles,
} from "@/forms/ShippingInfoForm";
import {
  CustomerInfoForm,
  CustomerInfoFormHandles,
} from "@/forms/CustomerInfoForm";

import { User, DeliveryTruck } from "iconoir-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Grid from "@/components/Grid/Grid";
import useMobile from "@/hooks/useMobile";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

interface DeliveryDetailsPageProps {}

const DeliveryDetailsPage: React.FC<DeliveryDetailsPageProps> = () => {
  const isMobile = useMobile();
  const navigate = useNavigate();

  const customerInfoFormRef = useRef<CustomerInfoFormHandles>(null);
  const shippingInfoFormRef = useRef<ShippingInfoFormHandles>(null);

  const handleCombinedSubmit = () => {
    console.log("handleCombinedSubmit clicked");
    customerInfoFormRef.current?.submit();
    shippingInfoFormRef.current?.submit();
  };

  return (
    <div>
      <Grid>
        <Card
          className={classNames(
            "w-full",
            { "start-4 col-6": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <CardHeader>
            <CardTitle>Delivery Informations</CardTitle>
            <CardDescription>
              Please provide the following information to proceed with your
              order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-base mb-2 flex gap-1">
              Customer Details <User />
            </CardTitle>
            <CustomerInfoForm ref={customerInfoFormRef} />
          </CardContent>
          <CardContent>
            <CardTitle className="text-base mb-2 flex gap-2">
              Shipping Details <DeliveryTruck />
            </CardTitle>
            <ShippingInfoForm ref={shippingInfoFormRef} />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => {
                handleCombinedSubmit();
                navigate("/order/checkout");
              }}
            >
              Continue to checkout
            </Button>
          </CardFooter>
        </Card>
      </Grid>
    </div>
  );
};

export default DeliveryDetailsPage;
