import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "@/api/employee/products";

import { useHeader } from "@/context/employee/HeaderContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/hooks/use-toast";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import CollapsibleCard from "@/components/CollapsibleCard/CollapsibleCard";

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

export interface DetailProductEmployeeDto {
  images: File[];
  name: string;
  price: number;
  description: string;
  quantity: number;
}

const ProductManagePage: React.FC<ProductManagePageProps> = ({
  isAdding = false,
}) => {
  const { setMode, setSaveFunction, setDeactivateFunction } = useHeader();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [productData, setProductData] = useState<Product>({
    images: [],
    name: "",
    price: 0,
    description: "",
    quantity: 0,
  });

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      setProductData(product);
    }
  }, [product]);

  useEffect(() => {
    setSaveFunction(() => handleSubmit);
    setDeactivateFunction(() => handleDeactivate);
    return () => {
      setSaveFunction(() => {});
      setDeactivateFunction(() => {});
    };
  }, [productData]);

  useEffect(() => {
    isAdding ? setMode("add") : setMode("edit");
  }, [setMode]);

  const mutationAdd = useMutation({
    mutationFn: addProduct,
    onSuccess: (data: any) => {
      toast({
        title: "Product added successfully!",
        description: (
          <div className="flex flex-row gap-3 items-center mt-3">
            <img className="h-[50px] aspect-square" src={data.thumbnailUrl} />
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">{data.name}</h1>
              <h1>{`${data.price}zł`}</h1>
            </div>
          </div>
        ),
      });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (updatedProduct: DetailProductEmployeeDto) =>
      updateProduct(Number(id), updatedProduct),
    onSuccess: (data: any) => {
      toast({
        title: "Product updated successfully!",
        description: (
          <div className="flex flex-row gap-3 items-center mt-3">
            <img
              className="h-[50px] aspect-square"
              src={data.thumbnailUrl}
              alt={data.name}
            />
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">{data.name}</h1>
              <h1>{`${data.price}zł`}</h1>
            </div>
          </div>
        ),
      });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: () => deleteProduct(Number(id)),
    onSuccess: (data: any) => {
      toast({
        title: "Product deleted successfully!",
        description: (
          <div className="flex flex-row gap-3 items-center mt-3">
            <img
              className="h-[50px] aspect-square"
              src={data.thumbnailUrl}
              alt={data.name}
            />
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">{data.name}</h1>
              <h1>{`${data.price}zł`}</h1>
            </div>
          </div>
        ),
      });
      navigate("/employee/product/list");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
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
    const detailProductEmployeeDto = {
      images: productData.images,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      quantity: productData.quantity,
    };
    isAdding
      ? mutationAdd.mutate(detailProductEmployeeDto)
      : mutationUpdate.mutate(detailProductEmployeeDto);
  };

  const handleDeactivate = async () => {
    mutationDelete.mutate();
  };

  return (
    <div className={styles["product-manage-page"]}>
      <div className={styles["product-manage-page__left"]}>
        <Card>
          <CardHeader>
            <CardTitle className="mb-4">Product Image</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            <ImageUploader
              initialImages={productData.images}
              onImagesChange={(images) => handleInputChange("images", images)}
            />
          </CardContent>
        </Card>
      </div>
      <div className={styles["product-manage-page__right"]}>
        <CollapsibleCard title="General Information">
          <CardContent>
            <p>Product Name</p>
            <Input
              className="rounded-md mt-1"
              placeholder="Enter product name"
              value={productData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </CardContent>
          <CardContent>
            <p>Price</p>
            <Input
              className="rounded-md mt-1 w-[130px]"
              placeholder="Enter price"
              value={productData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          </CardContent>
          <CardContent>
            <p>Description</p>
            <Textarea
              placeholder="Enter description"
              value={productData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </CardContent>
        </CollapsibleCard>
        <CollapsibleCard title="Manage Stock">
          <CardContent>
            <p>Stock</p>
            <Input
              className="rounded-md mt-1 w-[130px]"
              placeholder="Enter stock quantity"
              value={productData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
            />
          </CardContent>
        </CollapsibleCard>

        <button onClick={handleSubmit}>Save changes</button>
      </div>
    </div>
  );
};

export default ProductManagePage;
