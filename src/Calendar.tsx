import React, { useState, useCallback, useEffect, useRef } from "react";
import FullCalendar  from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useFirebaseEventList from "./hooks/useFirestoreEventAdd";
import allLocales from "@fullcalendar/core/locales-all";
import timegrid from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import Modal from "./components/block/Modal";
import Sidebar from "./Sidebar";
import { EventApiExtended } from "./types/api/googleCalendar";
import useFirestoreEvents from "./hooks/useFirestoreEvents";

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null!);
  const [events, setEvents] = useState<EventApiExtended[]>([
  ]);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  // モーダル
  const [isModalOpen, setIsModalOpen] = useState(false); //モーダルの表示状態
  const [modalSelect, setModalSelect] = useState<EventClickArg>(); //モーダルの中身の振り分け
  // 初期化イベント
  const { initialEvents } = useFirestoreEvents();
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

  // Googleカレンダー登録簡易ロジック
  const { handleEventAdd } = useFirebaseEventList();
  const handleButtonClick = useCallback(() => {
    const calendarApi = calendarRef.current.getApi();
    // 格納用の型を宣言
    const localEvents :EventApiExtended[] = [];
    let localEventsList = calendarApi.getEvents();
    localEventsList?.forEach((event) => {
      // eventsからeventを取り出し、EventApiExtended型にする。
      let extendedEvent: EventApiExtended = {
        id: event.id,
        title: event.title,
        start: event.start?.toISOString(),
        end: event.end?.toISOString(),
        allDay: event.allDay,
        backgroundColor: event.backgroundColor,
        borderColor: event.borderColor,
        extendedProps: event.extendedProps,
      };
      localEvents.push(extendedEvent);
      console.log(localEvents)
    });
    handleEventAdd(localEvents);
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

  return (
    <>
    <div className="demo-app">
      <Modal
        modalStatus={isModalOpen}
        content={modalSelect}
        modalClose={modalClose}
        />
      <Sidebar/>
      <button onClick={handleButtonClick}>現在のイベントを全て登録</button>
      {/* <button onClick={useGetEvents}>DB一覧取得</button> */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timegrid, interactionPlugin, listPlugin,]}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        events={initialEvents}
        allDaySlot={false}
        // events={events}
        // 日付セルのフォーマット
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
        // カレンダー全体のフォーマット
        slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
        // 現在時刻を赤線で表示する
        nowIndicator={true}
        // initialView="dayGridMonth"
        initialView="timeGridWeek"
        // 初期イベント追加
        // initialEvents={initialEvents}
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