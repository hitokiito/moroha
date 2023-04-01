import { SetStateAction, useCallback, useEffect, useState } from "react";
import FullCalendar  from "@fullcalendar/react";
import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { createEventId, INITIAL_EVENTS,DRAG_EVENTS } from "./event-utils";
import timegrid from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import Sidebar from "./Sidebar";
import Modal from "./components/block/Modal";
import useGoogleCalendar from "./hooks/useGoogleCalendar";

function App() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); //モーダルの表示状態
  const [modalSelect, setModalSelect] = useState<EventClickArg>(); //モーダルの中身の振り分け
  // イベントの配列をuseStateで管理する
  const [events, setEvents] = useState([]);
  // FullCalendarのeventsプロパティに渡す関数
  const handleEvents = useCallback((events: any) => {
    setEvents(events);
  }, []);
  
  // イベント作成
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

  // これでモーダル開く
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    setIsModalOpen(true);
    setModalSelect(clickInfo);
  }, []);

  //モーダルを閉じる
  const modalClose = () => {
    setIsModalOpen(false);
  };

  const { googleEvents, loading, error } = useGoogleCalendar("@gmail.com", "api");
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="demo-app">
      <Sidebar
      />
      <Modal
        modalStatus={isModalOpen}
        content={modalSelect}
        modalClose={modalClose}
      />
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timegrid, interactionPlugin, listPlugin, googleCalendarPlugin]}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          events={googleEvents}
          // 日付セルのフォーマット
          eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
          // カレンダー全体のフォーマット
          slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
          // 現在時刻を赤線で表示する
          nowIndicator={true}
          // initialView="dayGridMonth"
          initialView="timeGridWeek"
          // 初期イベント追加
          initialEvents={INITIAL_EVENTS}
          locales={allLocales}
          locale="ja"
          // 編集可能
          selectable={true}
          select={handleDateSelect}
          // 既にあるカレンダーをクリックした時
          editable={true}
          eventClick={handleEventClick}
          // イベント作成中にプレースホルダーとして表示させる
          selectMirror={true}
          // 日付の高さを固定
          dayMaxEvents={true}
          // 日付をクリックで日付へのリンク
          navLinks={true}
          handleWindowResize={true}
          weekends={weekendsVisible}
          displayEventTime={false}
          eventOverlap={false}
        />
      </div>
    </div>
  );
}

export default App;