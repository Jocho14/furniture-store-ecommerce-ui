import React from "react";
import { SheetClose } from "@/components/ui/sheet";

const SheetCloseWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <SheetClose asChild>{children}</SheetClose>;

export default SheetCloseWrapper;
