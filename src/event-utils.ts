import { EventInput } from "@fullcalendar/core";

let eventGrid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD
export const createEventId = () => String(eventGrid++);
export const INITIAL_EVENTS: EventInput[] = [
  // {
  //   id: createEventId(),
  //   title: "All-day event",
  //   start: todayStr,
  // },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",  // 時刻はTで区切る
  },
  {
    id: createEventId(),
    title: todayStr,
    start: todayStr + "T10:00:00",  // 時刻はTで区切る
    end: todayStr + "T12:00",  // 時刻は
  },
  // {
  //   id: createEventId(),
  //   title: "Timed event",
  //   start: "2023-03-24",  // 時刻はTで区切る
  // },

]