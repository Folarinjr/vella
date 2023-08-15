import { RouteComponentProps } from "react-router";

export interface IRating {
  rate: number;
  count: number;
}
export interface IProduct {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: IRating;
  title: string;
}
export interface ICart extends IProduct {
  quantity: number;
}

export interface ICheckout {
  name: string;
  address: string;
  email: string;
}

export interface ICartItemProps {
  cart: ICart;
  decreaseQty: (id: number) => void;
  increaseQty: (id: number) => void;
  removeItem: (id: number) => void;
}
export interface PageParams extends RouteComponentProps<{ id: string }> {}
