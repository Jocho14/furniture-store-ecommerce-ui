import React from "react";

import classNames from "classnames";
import useMobile from "@/hooks/useMobile";

import { Link } from "react-router-dom";

import Grid from "@/components/Grid/Grid";
import { Card, CardContent } from "@/components/ui/card";

import { getAllProductsForProductList } from "@/api/common/products";
import SkeletonWrapper from "@/components/SkeletonWrapper/SkeletonWrapper";

import { useQuery } from "@tanstack/react-query";

interface Props {}

const ProductListPage: React.FC<Props> = () => {
  const isMobile = useMobile();

  const { data: productsData, isLoading: productsDataLoading } = useQuery<
    any[]
  >({
    queryKey: ["products"],
    queryFn: () => getAllProductsForProductList(),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <Grid>
        <div
          className={classNames(
            { "start-1 col-12": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <div className="w-full">
            <div className="flex">
              <h1 className="text-3xl font-bold mb-6">All Products</h1>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-x-20 gap-y-40">
              {productsData?.map((product) => (
                <Card
                  key={product.id}
                  className="w-full md:w-[350px] h-[350px]"
                >
                  <Link to={`/product/${product.productId}`} className="block">
                    <SkeletonWrapper
                      loading={productsDataLoading}
                      className="w-[350px] h-[350px]"
                    >
                      <img
                        src={product.thumbnailUrl}
                        alt={product.name}
                        className="w-full h-66 object-cover"
                      />
                    </SkeletonWrapper>

                    <CardContent className="w-full p-0 mt-2">
                      <SkeletonWrapper
                        loading={productsDataLoading}
                        className="w-[350px] h-[50px]"
                      >
                        <h2 className="text-lg font-semibold mb-2">
                          {product.name}
                        </h2>
                        <p className="text-primary">{product.price}zł</p>
                      </SkeletonWrapper>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default ProductListPage;
