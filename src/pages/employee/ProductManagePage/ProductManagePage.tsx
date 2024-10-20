import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import ImageUploader from "@/components/ImageUploader/ImageUploader";
import CollapsibleCard from "@/components/CollapsibleCard/CollapsibleCard";

import styles from "./styles.module.scss";

interface ProductManagePageProps {
  isAdding?: boolean;
}

interface Product {
  images: File[];
  name: string;
  price: number;
  description: string;
  stock: number;
}

const ProductManagePage: React.FC<ProductManagePageProps> = ({
  isAdding = false,
}) => {
  const [productData, setProductData] = useState<Product>({
    images: [],
    name: "",
    price: 0,
    description: "",
    stock: 0,
  });

  const handleInputChange = (
    field: keyof Product,
    value: string | number | File[]
  ) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log(productData);

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
            <ImageUploader
              onImagesChange={(images) => handleInputChange("images", images)}
            />
          </CardContent>
        </Card>
      </div>
      <div className={styles["product-manage-page__right"]}>
        <CollapsibleCard title="Informacje ogólne">
          <CardContent>
            <p>Nazwa produktu</p>
            <Input
              className="rounded-md mt-1"
              placeholder="Wprowadź nazwę produktu"
              onBlur={(e) => handleInputChange("name", e.target.value)}
            />
          </CardContent>
          <CardContent>
            <p>Cena</p>
            <Input
              className="rounded-md mt-1 w-[130px]"
              placeholder="Wprowadź cenę"
              onBlur={(e) => handleInputChange("price", e.target.value)}
            />
          </CardContent>
          <CardContent>
            <p>Opis</p>
            <Textarea
              placeholder="Wprowadź opis"
              onBlur={(e) => handleInputChange("description", e.target.value)}
            />
          </CardContent>
        </CollapsibleCard>
        <CollapsibleCard title="Stan">
          <CardContent>
            <p>Stan magazynu</p>
            <Input
              className="rounded-md mt-1 w-[130px]"
              placeholder="Wprowadź stan"
              onBlur={(e) => handleInputChange("stock", e.target.value)}
            />
          </CardContent>
        </CollapsibleCard>
      </div>
    </div>
  );
};

export default ProductManagePage;
