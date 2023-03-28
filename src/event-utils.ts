import { EventInput } from "@fullcalendar/core";

let eventGrid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD
export const createEventId = () => String(eventGrid++);
export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  // {
  //   id: createEventId(),
  //   title: "Timed event",
  //   start: todayStr + "T12:00:00",  // 時刻はTで区切る
  // },
  // {
  //   id: createEventId(),
  //   title: todayStr,
  //   start: todayStr + "T10:00:00",  // 時刻はTで区切る
  //   end: todayStr + "T12:00",  // 時刻は
  // },
  // {
  //   id: createEventId(),
  //   title: "Timed event",
  //   start: "2023-03-24",  // 時刻はTで区切る
  // },
]

export const DRAG_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "30minutes",
    start: todayStr,
    duration:'00:30',
  },
  {
    id: createEventId(),
    title: "1hour",
    start: todayStr,
    duration:'01:00'
  },
  {
    id: createEventId(),
    title: "1.5hour",
    start: todayStr,
    duration:'01:30'
  },
  {
    id: createEventId(),
    title: "2hour",
    start: todayStr,
    duration:'02:00'
  },
  {
    id: createEventId(),
    title: "3hour",
    start: todayStr,
    duration:'03:00'
  },
  {
    id: createEventId(),
    title: "4hour",
    start: todayStr,
    duration:'04:00'
  },
]