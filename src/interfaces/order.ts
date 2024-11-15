export interface GuestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface ShippingAddressDto {
  streetAddress: string;
  houseNumber: string;
  city: string;
  postalCode: string;
}

export interface OrderProductDto {
  productId: number;
  quantity: number;
}

export interface CreateGuestOrderDto {
  guestDto: GuestDto;
  shippingAddressDto: ShippingAddressDto;
  orderProductDtos: OrderProductDto[];
}
