import React from "react";
import { Link } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ICollapsibleMenuItem } from "@/interfaces/MenuItem";

import { NavArrowDown, NavArrowUp } from "iconoir-react";
import styles from "./styles.module.scss";

interface ICollapsibleMenuItemProps extends ICollapsibleMenuItem {
  closeWrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

const CollapsibleMenuItem: React.FC<ICollapsibleMenuItemProps> = ({
  icon,
  name,
  subItems,
  closeWrapper: Wrapper = (props) => <>{props.children}</>,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className={styles["trigger"]}>
          <div className="flex flex-row gap-[10px]">
            {icon} {name}
          </div>
          <span className="ml-[60px]">
            {isOpen ? <NavArrowUp /> : <NavArrowDown />}
          </span>
        </div>
        <span className="sr-only">Toggle</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {subItems.map((item) => (
          <li key={item.name}>
            <Wrapper>
              <Link to={item.link} className={styles["li"]}>
                {item.icon}
                {item.name}
              </Link>
            </Wrapper>
          </li>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleMenuItem;
