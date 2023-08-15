import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Confetti from "react-confetti";
import React from "react";
import { useCheckout } from "../hooks";

import "./Home.css";

const Success: React.FC = () => {
  const { resetToDefault } = useCheckout();
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Order Placed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="center">
          <Confetti className="center" />
        </div>
        <h2 style={{ textAlign: "center" }}>Successful!!</h2>
        <IonButton
          onClick={() => {
            resetToDefault();
          }}
          expand="block"
          routerLink={`/home`}
        >
          Done
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Success;
