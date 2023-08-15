import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAppSelector } from "../reduxStore/hooks";
import { useCheckout } from "../hooks";

const Checkout: React.FC = () => {
  const carts = useAppSelector((state) => state.carts);
  const {
    price,
    userInfo,
    isTouched,
    isValid,
    modal,
    markTouched,
    onWillDismiss,
    setUserInfo,
    validate,
    confirm,
  } = useCheckout();

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              value={userInfo.name}
              onIonChange={(e) =>
                setUserInfo({ ...userInfo, name: e.detail.value! })
              }
              label="Name"
              labelPlacement="floating"
            />
          </IonItem>
          <IonItem>
            <IonInput
              value={userInfo.address}
              onIonChange={(e) =>
                setUserInfo({ ...userInfo, address: e.detail.value! })
              }
              label="Address"
              labelPlacement="floating"
            />
          </IonItem>
          <IonItem lines="none">
            <IonInput
              className={`${isValid && "ion-valid"} ${
                isValid === false && "ion-invalid"
              } ${isTouched && "ion-touched"}`}
              type="email"
              label="Email"
              labelPlacement="floating"
              helperText="Enter a valid email"
              errorText="Invalid email"
              value={userInfo.email}
              onIonInput={(event) => validate(event)}
              onIonBlur={() => markTouched()}
            />
          </IonItem>
          <IonButton id="open-modal" expand="block">
            CONTINUE
          </IonButton>
          <IonModal
            ref={modal}
            trigger="open-modal"
            onWillDismiss={(ev) => onWillDismiss(ev)}
          >
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>
                    Cancel
                  </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                  <IonButton
                    routerLink={`/success`}
                    strong={true}
                    onClick={() => confirm()}
                  >
                    Confirm
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              {userInfo.name && (
                <div
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    flexDirection: "column",
                  }}
                >
                  <IonLabel>Full name: </IonLabel>
                  <IonLabel style={{ fontWeight: "500" }}>
                    {userInfo.name}
                  </IonLabel>
                </div>
              )}

              {userInfo.address && (
                <div
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    flexDirection: "column",
                  }}
                >
                  <IonLabel position="stacked">Address:</IonLabel>
                  <IonLabel style={{ fontWeight: "500" }}>
                    {userInfo.address}
                  </IonLabel>
                </div>
              )}

              {userInfo.email && (
                <div
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    flexDirection: "column",
                  }}
                >
                  <IonLabel position="stacked">Email:</IonLabel>
                  <IonLabel style={{ fontWeight: "500" }}>
                    {userInfo.email}
                  </IonLabel>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  marginBottom: 10,
                  flexDirection: "column",
                }}
              >
                <IonLabel position="stacked">Total Price:</IonLabel>
                <IonLabel style={{ fontWeight: "500" }}>
                  &#x20A6;
                  {price?.toLocaleString()}
                </IonLabel>
              </div>

              <div style={{ marginTop: 20 }}>
                {carts.map((cart) => (
                  <IonCard key={cart.id} className="ion-margin-top">
                    <IonCardContent>
                      <div>
                        <div>
                          <IonImg src={cart?.image} />
                        </div>
                        <div>
                          <IonItem lines="none">
                            <IonLabel>Title: {cart?.title}</IonLabel>
                          </IonItem>
                          <IonItem lines="none">
                            <IonLabel>Des: {cart?.description}</IonLabel>
                          </IonItem>
                          <IonItem lines="none">
                            <IonLabel>
                              Price: &#x20A6;
                              {(cart?.price * cart?.quantity)
                                .toFixed(2)
                                .toLocaleString()}
                            </IonLabel>
                          </IonItem>

                          <IonItem lines="none">
                            <IonLabel>Qty: {cart?.quantity}</IonLabel>
                          </IonItem>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </IonContent>
          </IonModal>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
