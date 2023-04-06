import React, { useState, useCallback, useEffect } from "react";
import FullCalendar  from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useFirebaseEventList from "./hooks/useFirebaseEventList";
import allLocales from "@fullcalendar/core/locales-all";
import timegrid from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import Modal from "./components/block/Modal";
import Sidebar from "./Sidebar";
import { EventApiExtended } from "./types/api/googleCalendar";
import useGetEvents from "./hooks/useGetEvents";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import useFirebase from "./hooks/useGetEvents";


const Calendar = () => {
  const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD

  const [events, setEvents] = useState<EventApiExtended[]>([
    // { title: "イベント1", start: "2023-04-01" },
    // { title: "イベント2", start: "2023-04-03" },
    // { title: "イベント3", start: "2023-04-06" },
    // {
    //   id: createEventId(),
    //   title: "30minutes",
    //   start: todayStr,
    //   duration:'00:30',
    // },
    // {
    //   id: createEventId(),
    //   title: "1hour",
    //   start: todayStr,
    //   duration:'01:00'
    // },
    // {
    //   id: createEventId(),
    //   title: "1.5hour",
    //   start: todayStr,
    //   duration:'01:30'
    // },
    // {
    //   id: createEventId(),
    //   title: "2hour",
    //   start: todayStr,
    //   duration:'02:00'
    // },
    // {
    //   id: createEventId(),
    //   title: "3hour",
    //   start: todayStr,
    //   duration:'03:00'
    // },
    // {
    //   id: createEventId(),
    //   title: "4hour",
    //   start: todayStr,
    //   duration:'04:00'
    // },
  ]);

  const [weekendsVisible, setWeekendsVisible] = useState(true);

  // Googleカレンダー登録簡易ロジック
  const { handleEventAdd } = useFirebaseEventList();
  const handleButtonClick = useCallback(() => {
    console.log(events);
    handleEventAdd(events);
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
    // ＋ここでsetEventしないといけない。
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false); //モーダルの表示状態
  const [modalSelect, setModalSelect] = useState<EventClickArg>(); //モーダルの中身の振り分け

  // 詳細画面表示
  // これでモーダル開く
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    setIsModalOpen(true);
    setModalSelect(clickInfo);
  }, []);

  //モーダルを閉じる
  const modalClose = () => {
    setIsModalOpen(false);
  };


  const { iniEvetnt } = useFirebase("events");

  return (
    <>
     <div className="demo-app">

      <Modal
        modalStatus={isModalOpen}
        content={modalSelect}
        modalClose={modalClose}
        />
      <Sidebar
      />
        <button onClick={handleButtonClick}>現在のイベントを取得</button>
        {/* <button onClick={useGetEvents}>DB一覧取得</button> */}
      <FullCalendar
          plugins={[dayGridPlugin, timegrid, interactionPlugin, listPlugin,]}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          events={iniEvetnt}
          // events={googleEvents}
          // 日付セルのフォーマット
          eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
          // カレンダー全体のフォーマット
          slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
          // 現在時刻を赤線で表示する
          nowIndicator={true}
          // initialView="dayGridMonth"
          initialView="timeGridWeek"
          // 初期イベント追加
          // initialEvents={iniEvetnt}
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
    </>
  );
};

export default Calendar;