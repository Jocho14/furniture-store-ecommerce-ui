import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import SkeletonWrapper from "@/components/SkeletonWrapper/SkeletonWrapper";
import SearchedProduct, {
  SearchedProductProps,
} from "@/components/SearchedProduct/SearchedProduct";

import { ArrowRight } from "iconoir-react";
import styles from "./styles.module.scss";

interface SearchFieldProps {
  isSearching: boolean;
  searchedProducts?: SearchedProductProps[];
  searchedProductsLoading?: boolean;
}

const proposedSearches = [
  { title: "Living Room furniture", category: "living-room" },
  { title: "Kitchen furniture", category: "kitchen" },
  { title: "Bedroom furniture", category: "bedroom" },
  { title: "Office furniture", category: "office" },
];

const SearchField: React.FC<SearchFieldProps> = ({
  isSearching,
  searchedProducts,
  searchedProductsLoading = false,
}) => {
  return (
    <div className={styles["search-field"]}>
      {isSearching ? (
        <div className="flex flex-col gap-5">
          {Array.isArray(searchedProducts)
            ? searchedProducts.map((product) => (
                <SkeletonWrapper
                  loading={searchedProductsLoading}
                  className="w-[60px] h-[27px]"
                >
                  <SearchedProduct
                    {...product}
                    link={`/product/${product.productId}`}
                  />
                </SkeletonWrapper>
              ))
            : null}
        </div>
      ) : (
        proposedSearches.map((search) => {
          return (
            <Link to={`/product?categories=${search.category}`}>
              <Button aria-label="go to category" variant="link">
                {search.title} <ArrowRight height={12} />
              </Button>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default SearchField;
