export interface HomePageProduct {
  id: number;
  name: string;
  imageUrls: string[];
}

export interface MasonryContent {
  name: string;
  imageUrls: string[];
}

export interface ShoppingCartProductProps {
  productId: number;
  name: string;
  price: number;
  description: string;
  thumbnailUrl: string;
  quantity: number;
  availability: boolean;
  detailsLoading: boolean;
  availabilityLoading: boolean;
  className?: string;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export interface IProductPreview {
  productId: number;
  name: string;
  price: number;
  thumbnailUrl: string;
}
