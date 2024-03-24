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
