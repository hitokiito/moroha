import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { EventInput } from "@fullcalendar/core";

const useFirestoreEvents = (data: string) => {
  const [initialEvents, setInitialEvent] = useState<EventInput[]>([]);

  const fetchEventsFromFirestore = () => { // 引数を取らないように修正
    const docRef = collection(db, data);
    const unsub = onSnapshot(docRef, (snapshot: { docs: any[]; }) => {
      let results: any = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setInitialEvent(results);
    });
    return unsub;
  };

  useEffect(() => {
    const unsub = fetchEventsFromFirestore();
    return () => unsub();
  }, []);

  console.log(initialEvents);
  return { initialEvents, fetchEventsFromFirestore }; // fetchEventsFromFirestoreを追加
};

export default useFirestoreEvents;
