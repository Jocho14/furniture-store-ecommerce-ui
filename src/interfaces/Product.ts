export interface HomePageProduct {
  id: number;
  name: string;
  imageUrls: string[];
}

export interface ShoppingCartProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrls: string;
  quantity: number;
  availability: boolean;
  detailsLoading: boolean;
  availabilityLoading: boolean;
  className?: string;
  onQuantityChange: (id: number, quantity: number) => void;
}
