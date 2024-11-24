import * as React from "react";

import FavouriteProduct from "../FavouriteProduct/FavouriteProduct";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getAllFavourites } from "@/api/client/products";

import { ScrollArea, ScrollBar } from "@/components/ui/scrollArea";

interface FavouritesDrawerProps {
  trigger?: React.ReactNode;
}

const FavouritesDrawer: React.FC<FavouritesDrawerProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: favouriteProducts } = useQuery({
    queryFn: () => getAllFavourites(),
    queryKey: ["favouriteProducts"],
  });

  const handleProductClick = () => {
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger ? trigger : "Open"}</DrawerTrigger>
      <DrawerContent>
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              Favourite Products
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Here are products that you might want to buy.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 w-full">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-full justify-center">
                {Array.isArray(favouriteProducts) ? (
                  favouriteProducts?.map((product: any) => (
                    <Link
                      key={product.productId}
                      to={`/product/${product.productId}`}
                      onClick={handleProductClick}
                    >
                      <FavouriteProduct
                        name={product.name}
                        thumbnailUrl={product.thumbnailUrl}
                      />
                    </Link>
                  ))
                ) : (
                  <div className="text-center w-full">
                    No favourite products
                  </div>
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <DrawerFooter className="flex items-center">
            <DrawerClose asChild>
              <Button variant="outline" className="w-[300px]">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FavouritesDrawer;
