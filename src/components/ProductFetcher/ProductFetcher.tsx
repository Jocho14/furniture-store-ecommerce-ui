import React from "react";

import useFetch from "@/hooks/useFetch";

interface ProductFetcherProps {
  render: Function;
}

const ProductFetcher: React.FC<ProductFetcherProps> = ({ render }) => {
  const { data } = useFetch({
    url: "https://api.sampleapis.com/coffee/hot",
  });

  return render(data);
};

export default ProductFetcher;
