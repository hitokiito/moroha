import { useState } from "react";
import { EventApi, EventInput } from "@fullcalendar/core";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { EventApiExtended } from "../types/api/googleCalendar";


const useFirebaseEventList = () => {
 const [events, setEvents] = useState<EventApiExtended[]>([]);

  const handleEventAdd = async (newEvents: EventApiExtended[]) => {
    try {
      console.log(newEvents);
      newEvents?.forEach(async (event) => {
        console.log("handleEventAdd")
        const docRef = await addDoc(collection(db, "events"), event);
        console.log("Event added with ID: ", docRef.id);
      });
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  return { events, handleEventAdd };
};

export default useFirebaseEventList;