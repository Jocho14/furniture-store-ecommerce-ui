import React, { useRef, useCallback, useState } from "react";
import styles from "./styles.module.scss";

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
import { DeliveryDetailsForm } from "@/forms/DeliveryDetailsForm";

interface DeliveryDetailsPageProps {}

const DeliveryDetailsPage: React.FC<DeliveryDetailsPageProps> = () => {
  const isMobile = useMobile();
  const navigate = useNavigate();

  // const handleShippingInfoChange = useCallback((data: any) => {
  //   setFormData((prev) => ({ ...prev, shippingInfo: data }));
  // }, []); // Empty dependency array ensures it's only created once

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
