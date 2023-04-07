import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db ,doc ,setDoc} from "../firebase";
import { EventApiExtended } from "../types/api/googleCalendar";


const useFirestoreEventAdd = () => {
  const [events, setEvents] = useState<EventApiExtended[]>([]);
  function isNumber(value: any): boolean {
    return !Number.isNaN(parseInt(value));
  }

  const handleEventAdd = async (newEvents: EventApiExtended[]) => {
  try {
    console.log("イベント追加メソッド実行")
    console.log(newEvents);
    // DBからとってきたものは更新。
    newEvents?.forEach(async (event) => {
      let id;
      // 数字の場合は新規追加
      // DBから取得したものは上書き
      if(isNumber(event.id)) {
        id = doc(collection(db, "events")).id
        event.id = id
      } else {
        id = event.id
      }
      await setDoc(doc(db, "events", id), event);
  });
  } catch (error) {
    console.error("Error adding event: ", error);
  }
  };
  console.log("イベント追加メソッド終了")
  return { events, handleEventAdd };
};

export default useFirestoreEventAdd;