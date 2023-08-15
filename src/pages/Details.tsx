import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cashOutline, starHalfOutline } from "ionicons/icons";
import { PageParams } from "../types";
import { useGetDetail } from "../hooks";

const Details: React.FC<PageParams> = ({ match }) => {
  const { info, addProductToCart } = useGetDetail(Number(match.params.id));
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Product ({info?.category})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent text-center>
        {info && (
          <IonCard className="ion-margin-top">
            <IonCardHeader>
              <IonCardTitle>{info?.title}</IonCardTitle>
              <IonCardSubtitle>{info?.description}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonImg src={info?.image} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <IonItem lines="none">
                  <IonIcon
                    icon={starHalfOutline}
                    slot="start"
                    color="warning"
                  />
                  <IonLabel>{info?.rating.rate}</IonLabel>
                </IonItem>

                <IonItem lines="none">
                  <IonIcon icon={cashOutline} slot="start" color="success" />
                  <IonLabel>
                    &#x20A6;{(info?.price).toFixed(2).toLocaleString()}
                  </IonLabel>
                </IonItem>
              </div>
            </IonCardContent>
          </IonCard>
        )}
        <IonButton expand="block" onClick={addProductToCart}>
          Add To Cart
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Details;
