import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../services/firebase";

export type CityType = {
  initials: string;
  name: string;
  state: string;
  country: string;
};

// Defini um documento com o metodo set() do firebase com ID personalizado
export const createNewCityCustomId = async ({
  initials,
  name,
  state,
  country,
}: CityType) => {
  await setDoc(
    doc(firestore, "cities", initials),
    {
      name,
      state,
      country,
    },
    // Define que o documento será mesclado com os dados existentes
    { merge: true }
  );
};

// Defini um documento com o metodo set() do firebase com ID personalizado com elementos alinhados
export const createNewCityLinedElementsCustomId = async ({
  initials,
  name,
  state,
  country,
}: CityType) => {
  await setDoc(
    doc(firestore, "cities", initials),
    {
      name,
      state,
      country,
      info: {
        title: "informação da cidade",
        description: "decrição da cidade",
        date: new Date(),
      },
    },
    // Define que o documento será mesclado com os dados existentes
    { merge: true }
  );
};

// Defini um documento com o metodo addDoc() do firebase com ID automático
export const createNewCityAutomaticId = async ({
  initials,
  name,
  state,
  country,
}: CityType) => {
  await addDoc(collection(firestore, "cities"), {
    initials,
    name,
    state,
    country,
  });
};

// Atualiza um documento com o metodo updateDoc() do firebase
export const updateCity = async ({
  initials,
  name,
  state,
  country,
}: CityType) => {
  await updateDoc(doc(firestore, "cities", initials), {
    name,
    state,
    country,
    tourism: arrayUnion("museums", "parks", "restaurants"),
    // tourism: arrayRemove("restaurants"),
  });
};
