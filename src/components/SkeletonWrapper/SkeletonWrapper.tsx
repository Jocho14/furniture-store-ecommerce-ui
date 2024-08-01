import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonWrapperProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
}

const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
  loading,
  children,
  className,
}) => {
  return loading ? <Skeleton className={className} /> : children;
};

export default SkeletonWrapper;
