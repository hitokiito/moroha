import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { EventInput } from "@fullcalendar/core";


const useFirestoreEvents = () => {
  const [initialEvents, setInitialEvent] = useState<EventInput[]>([]);
  const fetchEventsFromFirestore = (data: string) => {
    let results: any = [];
    console.log("イベント取得メソッド実行")
    const docRef = collection(db, data);

    const unsub = onSnapshot(docRef, (snapshot: { docs: any[]; }) => {
      snapshot.docs.forEach((doc) => {
        const event = doc.data();
        for (const key in event) {
          if (event[key] === undefined || event[key] === null) {
            delete event[key];
          }
        }
        results.push(event);
      });
      setInitialEvent(results);
    });
    console.log(results)
    console.log("イベント取得メソッド終了")
    return unsub;
  };
  useEffect(() => {
    const unsub = fetchEventsFromFirestore("events");
    return () => unsub();
  }, []);
  return { initialEvents, fetchEventsFromFirestore };
};

export default useFirestoreEvents;
