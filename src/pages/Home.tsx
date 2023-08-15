import {
  IonAvatar,
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useGetProducts } from "../hooks";
import { IProduct } from "../types";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  const { data, renderProducts, searchTerm, setSearchTerm, setType, type } =
    useGetProducts();
  return (
    <IonPage>
      <NavBar title="All Products" />
      <IonContent>
        <IonSearchbar
          value={searchTerm}
          onIonChange={(e) => {
            if (e.detail.value === undefined) return;
            setSearchTerm(e.detail.value!);
          }}
          placeholder="Search by name...."
        />
        <IonItem>
          <IonLabel>Select Categories</IonLabel>
          <IonSelect
            value={type}
            onIonChange={(e) => {
              setType(e.detail.value!);
            }}
            label="Categories"
          >
            <IonSelectOption value="">All</IonSelectOption>
            {data.map((category) => (
              <IonSelectOption value={category} key={category}>
                {category}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonList className="ion-margin-top">
          {renderProducts().map((product: IProduct) => (
            <IonItem
              button
              key={product.id}
              routerLink={`/product/${product.id}`}
            >
              <IonAvatar slot="start">
                <IonImg src={product.image} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{product.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
