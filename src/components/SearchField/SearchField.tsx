import React from "react";
import styles from "./styles.module.scss";

import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

import { ArrowRight } from "iconoir-react";

import SearchedProduct from "../SearchedProduct/SearchedProduct";

interface SearchFieldProps {
  isSearching: boolean;
}

const proposedSearches = [
  { title: "Living Room furniture", category: "living-room" },
  { title: "Kitchen furniture", category: "kitchen" },
  { title: "Bedroom furniture", category: "bedroom" },
  { title: "Office furniture", category: "office" },
];

const SearchField: React.FC<SearchFieldProps> = ({ isSearching }) => {
  return (
    <div className={styles["search-field"]}>
      {isSearching && (
        <SearchedProduct
          name="Living Room Sofa"
          category="Living Room"
          imageUrl="https://firebasestorage.googleapis.com/v0/b/furniture-store-ecommerce.appspot.com/o/images%2Fproducts%2F1%2F1_0?alt=media&token=2c682a87-4f98-48af-bd9e-cade0006f614"
          link="/product/1"
        />
      )}
      {!isSearching &&
        proposedSearches.map((search) => {
          return (
            <Link to={`/product?categories=${search.category}`}>
              <Button variant="link">
                {search.title} <ArrowRight height={12} />
              </Button>
            </Link>
          );
        })}
    </div>
  );
};

export default SearchField;
