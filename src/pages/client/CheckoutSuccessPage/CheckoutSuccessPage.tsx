import { useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Grid from "@/components/Grid/Grid";

import { useCart } from "@/context/client/CartContext";

import useMobile from "@/hooks/useMobile";

import { Check, ShoppingBag } from "iconoir-react";

const CheckoutSuccessPage = () => {
  const isMobile = useMobile();
  const { clearCart } = useCart();
  const purchasedProducts = [
    { id: 1, name: "Table", price: 129.99, quantity: 1 },
    { id: 2, name: "Chair", price: 24.99, quantity: 2 },
    { id: 3, name: "Bed", price: 9.99, quantity: 3 },
  ];

  useEffect(() => {
    clearCart();
  }, []);

  //   const orderTotal = purchasedProducts.reduce(
  //     (total, product) => total + product.price * product.quantity,
  //     0
  //   );

  return (
    <div>
      <Grid>
        <div
          className={classNames(
            { "start-4 col-6": !isMobile },
            { "start-1 col-4": isMobile },
            "flex items-center justify-center"
          )}
        >
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Payment Successful!
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Thank you for your purchase. Your order has been processed
                successfully.
              </p>
            </CardHeader>
            <CardContent>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="space-y-2">
                    {purchasedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-center"
                      >
                        <span className="flex-1">{product.name}</span>
                        <span className="text-muted-foreground">
                          x{product.quantity}
                        </span>
                        <span className="font-medium">
                          ${(product.price * product.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      {/* <span>${orderTotal.toFixed(2)}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/">
                <Button className="w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default CheckoutSuccessPage;
