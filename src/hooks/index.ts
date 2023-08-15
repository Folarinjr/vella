import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { getProductsAsync } from "../reduxStore/productSlice";
import { useIonViewWillEnter } from "@ionic/react";
import {
  addCartProduct,
  decreaceCartQty,
  defaultState,
  deleteCartProduct,
  increaceCartQty,
} from "../reduxStore/cartSlice";
import { ICheckout, IProduct } from "../types";
import { toast } from "react-hot-toast";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

export const useGetCategories = () => {
  const [data, setData] = useState<string[]>([]);
  const getCategories = async () => {
    const resp = await fetch("https://fakestoreapi.com/products/categories");
    if (resp.ok) {
      let res = await resp.json();
      setData(res);
      return { data };
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return {
    data,
  };
};

export const useGetProducts = () => {
  const { data } = useGetCategories();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const [results, setResults] = useState<IProduct[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");

  const filterSearch = useCallback(() => {
    const filteredProducts = products?.filter((el) =>
      searchTerm === ""
        ? true
        : el.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filteredProducts);
  }, [searchTerm, products]);

  const searchByCategory = async () => {
    if (type !== "") {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${type}`
      );
      if (res.ok) {
        let resp = await res.json();
        setResults(resp);
        return { results };
      }
    }
  };

  const renderProducts = (): IProduct[] => {
    if (results.length <= 0) {
      return products;
    } else {
      return results;
    }
  };

  useEffect(() => {
    filterSearch();
    if (type !== "") searchByCategory();
  }, [searchTerm, type]);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  return {
    products,
    searchTerm,
    type,
    results,
    data,
    renderProducts,
    setSearchTerm,
    setType,
  };
};

export const useGetDetail = (id: number) => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.carts);
  const [info, setInfo] = useState<IProduct>();
  const getDetail = async (id: number) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    console.log(res);
    if (res.ok) {
      let resp = await res.json();
      setInfo(resp);
      return { info };
    }
  };
  useIonViewWillEnter(async () => {
    await getDetail(id);
  });
  const addProductToCart = () => {
    const existingObj = carts.find((obj) => obj.id === info?.id);
    if (!existingObj) {
      dispatch(addCartProduct(info));
      toast.success("Product added successfully");
    } else {
      toast.error("This product already exist in cart!");
    }
  };
  return {
    info,
    addProductToCart,
  };
};

export const useCart = () => {
  const [price, setPrice] = useState<number>();
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.carts);
  const decreaseQty = (id: number) => {
    const existingcart = carts.find((obj) => obj.id === id);
    if (existingcart?.quantity! > 1) {
      dispatch(decreaceCartQty(id));
    } else {
      return;
    }
  };

  const increaseQty = (id: number) => {
    dispatch(increaceCartQty(id));
  };

  const removeItem = (id: number) => {
    dispatch(deleteCartProduct(id));
  };
  useEffect(() => {
    const totalPrice = carts.reduce(
      (sum, curr) => sum + curr.price * curr.quantity,
      0
    );
    setPrice(totalPrice);
  }, [carts]);
  return {
    price,
    decreaseQty,
    increaseQty,
    removeItem,
  };
};

export const useCheckout = () => {
  const dispatch = useAppDispatch();
  const { price } = useCart();

  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<ICheckout>({
    name: "",
    address: "",
    email: "",
  });
  const [_, setMessage] = useState<string>("Triggers");
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === "") return;
    setUserInfo({ ...userInfo, email: value });

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };
  const markTouched = () => {
    setIsTouched(true);
  };

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  const resetToDefault = () => {
    dispatch(defaultState());
  };

  return {
    price,
    isTouched,
    isValid,
    userInfo,
    modal,
    resetToDefault,
    setUserInfo,
    validate,
    markTouched,
    confirm,
    onWillDismiss,
  };
};
