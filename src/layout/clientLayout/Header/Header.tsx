import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

import { useCart } from "@/context/client/CartContext";

import { getSearchResults } from "@/api/common/products";

import Grid from "@/components/Grid/Grid";
import Navbar from "@/components/Navbar/Navbar";
import CustomInput from "@/components/CustomInput/CustomInput";
import SearchField from "@/components/SearchField/SearchField";

import useMobile from "@/hooks/useMobile";
import useScroll from "@/hooks/useScroll";
import useDebounce from "@/hooks/useDebounce";

import { Search } from "iconoir-react";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const isMobile = useMobile();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandedSearchField, setShowExpandedSearchField] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useScroll(headerRef, styles);

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleOutsideClick = () => {
    setIsExpanded(false);
  };

  const {
    data: searchResults,
    isLoading: searchResultsLoading,
    refetch,
  } = useQuery({
    queryKey: ["searchResults", debouncedSearchTerm],
    queryFn: () => getSearchResults(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      refetch();
    }
  }, [debouncedSearchTerm, refetch]);

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setShowExpandedSearchField(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowExpandedSearchField(false);
    }
  }, [isExpanded]);

  return (
    <header
      ref={headerRef}
      className={classNames(styles["header"], {
        [styles["expanded"]]: isExpanded,
      })}
    >
      <Grid className={styles["grid"]}>
        <div
          className={classNames(
            styles["header__logo"],
            "start-1",
            "col-1",
            "align-top",
            "centerNav-true"
          )}
        >
          <Link to="">LOGO</Link>
        </div>
        <div
          className={classNames(
            styles["header__input"],
            { "start-2 col-6": !isMobile },
            { "grid-hidden": isMobile },
            "align-top",
            "centerNav-true"
          )}
        >
          <CustomInput
            type="text"
            icon={<Search />}
            placeholder="Search"
            onClick={handleInputClick}
            onChange={handleInputChange}
            value={searchTerm}
          />
          {showExpandedSearchField && (
            <div
              className={classNames(styles["header__input__expanded"], {
                [styles["visible"]]: isExpanded,
              })}
            >
              <SearchField
                searchedProducts={searchResults}
                searchedProductsLoading={searchResultsLoading}
                isSearching={searchTerm.length > 0}
              />
            </div>
          )}
        </div>
        <Navbar
          cartCount={cartCount}
          isMobile={isMobile}
          className={classNames(
            { "start-9 col-4": !isMobile },
            { "start-3 col-1": isMobile },
            "centerNav-true"
          )}
        />
      </Grid>
      {isExpanded && (
        <div className={styles["overlay"]} onClick={handleOutsideClick}></div>
      )}
    </header>
  );
};

export default Header;
