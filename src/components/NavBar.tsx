import {
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import React from "react";
import { useAppSelector } from "../reduxStore/hooks";

interface INavBar {
  title: string;
}

const NavBar: React.FC<INavBar> = ({ title }: INavBar) => {
  const carts = useAppSelector((state) => state.carts);
  return (
    <IonHeader mode="ios">
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <div
          slot="end"
          style={{
            borderRadius: 100,
            width: 30,
            height: 30,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IonButton color="light" routerLink={`/carts`}>
            <IonIcon icon={cartOutline} size="large" />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,.9)",
                borderRadius: 100,
                color: "white",
                fontSize: 15,
                width: 20,
                height: 15,
              }}
            >
              {carts.length}
            </div>
          </IonButton>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavBar;
