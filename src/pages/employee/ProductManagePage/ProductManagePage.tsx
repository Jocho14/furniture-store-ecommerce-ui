import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "iconoir-react";
import { Separator } from "@/components/ui/separator";
import ActionIcon from "@/components/ActionIcon/ActionIcon";
import styles from "./styles.module.scss";
import Draggable from "@/components/Draggable/Draggable";
import { DndContext } from "@dnd-kit/core";
import ImageContainer from "@/components/ImageContainer/ImageContainer";

interface ProductManagePageProps {
  isAdding?: boolean;
}

const ProductManagePage: React.FC<ProductManagePageProps> = ({
  isAdding = false,
}) => {
  return (
    <div className={styles["product-manage-page"]}>
      <div className={styles["product-manage-page__left"]}>
        {" "}
        <Card>
          <CardHeader>
            <CardTitle className="mb-4">Zdjęcie produktu</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            <ImageContainer />
          </CardContent>
        </Card>
      </div>
      <div className={styles["product-manage-page__right"]}>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagePage;
