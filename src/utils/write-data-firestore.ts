/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../services/firebase";

export type CreateNewCityType = {
  initials: string;
  name: string;
  state: string;
  country: string;
};

// Receber os dados de um documento
export const getCity = async (initials: string) => {
  const docRef = doc(firestore, "cities", initials);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// Receber documentos filtrados
export const getCityByState = async (state: string) => {
  const q = query(
    collection(firestore, "cities"),
    where("state", "==", state)
    // or(where("state", "==", state), where("population", ">=", 1))
    // and(where("state", "==", state), where("population", ">=", 1))
    // orderBy("name")
    // limit(1)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.docs.map((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

// Receber todos os documentos
export const getAllCities = async () => {
  const querySnapshot = await getDocs(collection(firestore, "cities"));
  querySnapshot.docs.map((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

// Observa mudanças em tempo real
export const unsub = onSnapshot(doc(firestore, "cities", "BEL"), (doc: any) => {
  console.log("data: ", doc.data());
});
