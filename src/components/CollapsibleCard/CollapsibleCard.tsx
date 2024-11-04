import React, { useState } from "react";
import classNames from "classnames";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { NavArrowDown, NavArrowUp } from "iconoir-react";

import styles from "./styles.module.scss";

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <Card>
      <div
        onClick={toggleExpand}
        className={classNames(
          styles["card-header"],
          "h-[50px] p-6 flex items-center justify-between cursor-pointer"
        )}
      >
        <CardTitle>{title}</CardTitle>
        {isExpanded ? <NavArrowUp /> : <NavArrowDown />}
      </div>
      <Separator />
      <div
        className={classNames(
          "transition-all duration-300 ease-in-out overflow-hidden",
          {
            "max-h-0 opacity-0": !isExpanded,
            "max-h-200 opacity-100": isExpanded,
          }
        )}
      >
        <div className="mt-3"></div>
        {children}
      </div>
    </Card>
  );
};

export default CollapsibleCard;
