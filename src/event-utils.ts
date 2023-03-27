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
    title: "DRAG1 duration:4",
    start: todayStr,
    duration:'04:00'
  },
  {
    id: createEventId(),
    title: "DRAG2 duration:none",
    // start: todayStr + "T09:00:00",  // 時刻はTで区切る
  },
  {
    id: createEventId(),
    title: "DRAG3 start end duration",
    start: todayStr + "T10:00:00",  // 時刻はTで区切る
    end: todayStr + "T12:00",  // 時刻は
    duration:'00:10'
  },
  {
    id: createEventId(),
    title: "DRAG4 start only",
    start: "2023-03-24",  // 時刻はTで区切る
  },
]

// durationチェック
// export const DRAG_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: "durationTEST",
//     // start: todayStr,
//     // duration:'04:00'
//   },
//   {
//     id: createEventId(),
//     title: "DRAG1",
//     // start: todayStr + "T09:00:00",  // 時刻はTで区切る
//     // slotDuration: '02:00' // 2 hours
//   },
//   {
//     id: createEventId(),
//     title: "DRAG2",
//     start: todayStr + "T10:00:00",  // 時刻はTで区切る
//     end: todayStr + "T12:00",  // 時刻は
//     slotDuration: '02:00', // 2 hours
//     duration:'04:00'
//   },
//   {
//     id: createEventId(),
//     title: "DRAG3",
//     start: "2023-03-24",  // 時刻はTで区切る
//     slotDuration: '02:00' // 2 hours
//   },
// ]