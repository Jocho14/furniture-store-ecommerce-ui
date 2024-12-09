import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchSessionStatus } from "@/api/client/payment";

import CheckoutSuccessPage from "@/pages/client/CheckoutSuccessPage/CheckoutSuccessPage";

const CheckoutReturnPage: React.FC = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");

  const { data, isLoading, error } = useQuery({
    queryKey: ["sessionStatus", sessionId],
    queryFn: () => fetchSessionStatus(sessionId),
    enabled: !!sessionId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (data?.status === "open") {
    return <Navigate to="/order/checkout" />;
  }

  if (data?.status === "paid") {
    return <CheckoutSuccessPage />;
  }

  return null;
};

export default CheckoutReturnPage;
