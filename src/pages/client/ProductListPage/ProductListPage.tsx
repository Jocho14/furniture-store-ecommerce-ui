import React, { useState, useEffect } from "react";

import classNames from "classnames";
import useMobile from "@/hooks/useMobile";

import { useLocation, Link } from "react-router-dom";

import Grid from "@/components/Grid/Grid";
import { Card, CardContent } from "@/components/ui/card";

import { getAllProductsForProductList } from "@/api/common/products";
import SkeletonWrapper from "@/components/SkeletonWrapper/SkeletonWrapper";
import styles from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import DropdownSortButton from "@/components/DropdownSortButton/DropdownSortButton";
import DropdownFilterButton from "@/components/DropdownFilterButton/DropdownFilterButton";
import { Separator } from "@/components/ui/separator";

interface Props {}

const ProductListPage: React.FC<Props> = () => {
  const isMobile = useMobile();
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const { data: productsData, isLoading: productsDataLoading } = useQuery<
    any[]
  >({
    queryKey: ["productList"],
    queryFn: () => getAllProductsForProductList(),
    staleTime: 1000 * 60 * 5,
  });

  console.log("productsData: ", productsData);

  useEffect(() => {
    console.log("used effect");
    const params = new URLSearchParams(location.search);
    const categories = params.get("categories")?.split(",") || [];
    if (productsData) {
      const filtered = productsData.filter((product) =>
        categories.length > 0 ? categories.includes(product.category) : true
      );
      console.log("filtered: ", filtered);
      setFilteredProducts(filtered);
    }
  }, [location.search, productsData]);
  console.log("location search: ", location.search);
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div>
      <Grid>
        <div
          className={classNames(
            { "start-1 col-12": !isMobile },
            { "start-1 col-4": isMobile },
            "w-full"
          )}
        >
          <div className="w-full">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold mb-6">All Products</h1>
              <div className="flex gap-6">
                <DropdownSortButton setSortOrder={setSortOrder} />
                <DropdownFilterButton />
              </div>
            </div>

            <div className={classNames(styles["product__list"])}>
              {sortedProducts?.map((product) => (
                <Card key={product.id} className={styles["card"]}>
                  <Link to={`/product/${product.productId}`} className="block">
                    <SkeletonWrapper
                      loading={productsDataLoading}
                      className="w-[350px] h-[350px]"
                    >
                      <img
                        src={product.thumbnailUrl}
                        alt={product.name}
                        className={classNames(
                          styles["card__img"],
                          "w-full h-66 object-cover"
                        )}
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
