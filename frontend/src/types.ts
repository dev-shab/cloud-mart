interface ReviewsType {
  _id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ShippingAddressType {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ProductType {
  _id: string;
  user: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: ReviewsType[];
}

export interface CartDetailsType {
  cartItems: (ProductType & { qty: number })[];
  itemsPrice: string;
  shippingAddress: ShippingAddressType | null;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  paymentMethod: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface OrderDetailsType {
  _id: string;
  user: UserType;
  orderItems: (ProductType & { qty: number })[];
  shippingAddress: ShippingAddressType | null;
  paymentMethod: string;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt: string;
  paidAt: string;
  createdAt: string;
}
