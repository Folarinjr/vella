import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";
import { ICartItemProps } from "../types";
import { trashBinOutline } from "ionicons/icons";

const CartItem: React.FC<ICartItemProps> = ({
  cart,
  decreaseQty,
  increaseQty,
  removeItem,
}) => {
  return (
    <IonCard className="ion-margin-top">
      <IonCardContent>
        <div>
          <div>
            <IonImg src={cart?.image} />
          </div>
          <div>
            <IonItem lines="none">
              <IonLabel>Des: {cart?.description}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                Price: &#x20A6;
                {(cart?.price * cart?.quantity).toFixed(2).toLocaleString()}
              </IonLabel>
            </IonItem>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IonButton color="danger" onClick={() => removeItem(cart.id)}>
            <IonIcon slot="start" icon={trashBinOutline} />
            REMOVE
          </IonButton>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IonButton onClick={() => decreaseQty(cart.id)}>-</IonButton>
            <IonInput
              value={cart.quantity}
              readonly
              style={{
                width: "50px",
                textAlign: "center",
              }}
            />
            <IonButton
              onClick={() => {
                increaseQty(cart.id);
              }}
            >
              +
            </IonButton>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CartItem;
