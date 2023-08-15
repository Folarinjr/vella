import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import CartItem from "../components/CartItem";
import { PageParams } from "../types";
import { useCart } from "../hooks";
import { useAppSelector } from "../reduxStore/hooks";

const Cart: React.FC<PageParams> = () => {
  const { price, decreaseQty, increaseQty, removeItem } = useCart();
  const carts = useAppSelector((state) => state.carts);

  console.log(carts);
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent text-center className="--ion-card-background">
        <IonItem lines="none">
          <IonLabel>CART SUMMARY</IonLabel>
        </IonItem>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <IonItem lines="none">
            <IonLabel>SubTotal</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonLabel>&#x20A6;{price?.toLocaleString()}</IonLabel>
          </IonItem>
        </div>
        <IonItem lines="none">
          <IonLabel>CART({carts.length})</IonLabel>
        </IonItem>
        <div style={{ marginTop: "30px" }}>
          {carts.map((cart) => (
            <CartItem
              key={cart.id}
              cart={cart}
              decreaseQty={decreaseQty}
              increaseQty={increaseQty}
              removeItem={removeItem}
            />
          ))}
        </div>
        <IonButton expand="block" routerLink={`/checkout`}>
          CHECKOUT (&#x20A6;{price?.toLocaleString()})
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
