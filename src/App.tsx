import { useCallback, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
import FullCalendar  from "@fullcalendar/react";
import { DateSelectArg, EventApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId, INITIAL_EVENTS } from "./event-utils";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback((events: EventApi[]) => {
    console.log("events:", events);  // 確認用
    setCurrentEvents(events);
  }, []);

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    let title = prompt("イベントのタイトルを入力してください。")?.trim();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }, []);
  

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          // 初期イベント追加
          initialEvents={INITIAL_EVENTS}
          locales={allLocales}
          locale="ja"
          // 起動タイミングを調べる
          eventsSet={handleEvents}

          // 編集可能
          selectable={true}
          select={handleDateSelect}
        />
      </div>
    </div>
  );
}

export default App;