import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { EventInput } from "@fullcalendar/core";

const useFirestoreEvents = () => {
  const [initialEvents, setInitialEvent] = useState<EventInput[]>([]);
  const fetchEventsFromFirestore = (data: string) => { // 引数を取らないように修正
    let results: any = [];
    console.log("イベント取得メソッド実行")
    const docRef = collection(db, data);
    const unsub = onSnapshot(docRef, (snapshot: { docs: any[]; }) => {
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setInitialEvent(results);
    });
    console.log(results)
    console.log("イベント取得メソッド終了")
    return results;
  };
  useEffect(() => {
    const unsub = fetchEventsFromFirestore("events");
    return () => unsub();
  }, []);
  console.log("コンポーネントが実行");
  return { initialEvents }; // fetchEventsFromFirestoreを追加
};

export default useFirestoreEvents;