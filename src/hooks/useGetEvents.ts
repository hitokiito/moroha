import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { EventInput } from "@fullcalendar/core";

const useFirebase = (data: string) => {
  const [iniEvetnt, setIniEvetnt] = useState<EventInput[]>([]);

  useEffect(() => {
    const docRef = collection(db, data);
    const unsub = onSnapshot(docRef, (snapshot) => {
      let results: any = [];
      snapshot.docs.forEach((doc) => {
        console.log(doc)
        results.push({ ...doc.data(), id: doc.id });
      });
      setIniEvetnt(results);
    });
    return () => unsub();
  }, [data]);
  
  console.log(iniEvetnt)
  return { iniEvetnt };
};

export default useFirebase;