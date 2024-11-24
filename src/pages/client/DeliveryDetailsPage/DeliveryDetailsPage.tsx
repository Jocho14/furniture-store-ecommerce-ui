import React from "react";
import classNames from "classnames";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Grid from "@/components/Grid/Grid";

import useMobile from "@/hooks/useMobile";

import { DeliveryDetailsForm } from "@/forms/DeliveryDetailsForm";

interface DeliveryDetailsPageProps {}

const DeliveryDetailsPage: React.FC<DeliveryDetailsPageProps> = () => {
  const isMobile = useMobile();

  return (
    <div>
      <Grid>
        <Card
          className={classNames(
            "w-full pt-4",
            { "start-4 col-6": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
            <CardDescription>
              Please provide your delivery details
            </CardDescription>
          </CardHeader>
          <DeliveryDetailsForm />
        </Card>
      </Grid>
    </div>
  );
};

export default DeliveryDetailsPage;
