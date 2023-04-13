import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartItem {
  id: string | number;
  image: string;
  price: number;
  title: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItem: (id: CartItem["id"]) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem("SHOPPING_CART");

  if (!itemsFromLocalStorage) return;
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getSetItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("SHOPPING_CART", JSON.stringify(cartItems));
};

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []);

  useEffect(() => {
    if (cartItems === undefined) {
      return;
    }
    getSetItemsInStorage(cartItems);
  }, [cartItems]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems || [],
        addItemToCart: (item: CartItem) => {
          setCartItems((prevState = []) => {
            const existingItem = prevState?.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!existingItem) {
              return [...prevState, item];
            }
            const index = prevState?.indexOf(existingItem);

            const newItem = {
              ...existingItem,
              qty: existingItem.qty + 1,
            };
            return prevState.map((existingItem) => {
              if (existingItem.id === item.id) {
                return { ...existingItem, qty: existingItem.qty + 1 };
              }
              return existingItem;
            });
          });
        },
        removeItem: (id) => {
          setCartItems((prevState = []) => {
            const existingItem = prevState.find(
              (existingItem) => existingItem.id === id
            );
            if (existingItem && existingItem.qty <= 1) {
              return prevState.filter((existingItem) => existingItem.id !== id);
            }
            return prevState.map((existingItem) => {
              if (existingItem.qty === 1) {
              }
              if (existingItem.id === id) {
                return { ...existingItem, qty: existingItem.qty - 1 };
              }
              return existingItem;
            });
          });
        },
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error(`You forgot about CartStateContextProvider!`);
  }
  return cartState;
};
