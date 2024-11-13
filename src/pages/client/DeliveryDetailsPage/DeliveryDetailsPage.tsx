import React from "react";
import styles from "./styles.module.scss";

import { ShippingInfoForm } from "@/forms/ShippingInfoForm";
import { CustomerInfoForm } from "@/forms/CustomerInfoForm";
import { User, DeliveryTruck } from "iconoir-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Grid from "@/components/Grid/Grid";
import useMobile from "@/hooks/useMobile";
import classNames from "classnames";

interface DeliveryDetailsPageProps {}

const DeliveryDetailsPage: React.FC<DeliveryDetailsPageProps> = () => {
  const isMobile = useMobile();

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
            <CardTitle className="text-base mb-2 flex gap-2">
              Customer Details <User />
            </CardTitle>
            <CustomerInfoForm />
          </CardContent>
          <CardContent>
            <CardTitle className="text-base mb-2 flex gap-2">
              Shipping Details <DeliveryTruck />
            </CardTitle>
            <ShippingInfoForm />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default DeliveryDetailsPage;
