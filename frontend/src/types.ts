interface ReviewsType {
  user: string;
  name: string;
  rating: number;
  comment: string;
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
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
