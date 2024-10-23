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
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "@/api/employee/products";

import styles from "./styles.module.scss";

interface ProductManagePageProps {
  isAdding?: boolean;
}

export interface Product {
  images: File[];
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export interface DetailedProductDto {
  images: File[];
  details: {
    name: string;
    price: number;
    description: string;
  };
  quantity: number;
}

const ProductManagePage: React.FC<ProductManagePageProps> = ({
  isAdding = false,
}) => {
  const [productData, setProductData] = useState<Product>({
    images: [],
    name: "",
    price: 0,
    description: "",
    quantity: 0,
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      console.log("Product added:", data);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const detailedProductDto = {
      images: productData.images,
      details: {
        name: productData.name,
        price: productData.price,
        description: productData.description,
      },
      quantity: productData.quantity,
    };

    mutation.mutate(detailedProductDto);
  };

  console.log(productData);

  return (
    <div className={styles["product-manage-page"]}>
      <div className={styles["product-manage-page__left"]}>
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
              onBlur={(e) => handleInputChange("quantity", e.target.value)}
            />
          </CardContent>
        </CollapsibleCard>
        <button onClick={handleSubmit}>Dodaj produkt do bazy</button>
      </div>
    </div>
  );
};

export default ProductManagePage;
