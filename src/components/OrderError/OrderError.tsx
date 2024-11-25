import {
    Card,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  import { Xmark } from "iconoir-react";

const OrderError = () => {
  return (
    <div className="">
      <Card className="w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Xmark className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Error!
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Your order has been either completed or cancelled. Please contact us for further assistance.
              </p>
            </CardHeader>
        </Card>
    </div>
  );
};

export default OrderError;
