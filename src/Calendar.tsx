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
  const [modalSelect, setModalSelect] = useState<EventClickArg>(); //モーダルの中身の振り分け
  // 初期化イベント
  const { initialEvents } = useFirestoreEvents();
  
  // モーダル
  const [isModalOpen, setIsModalOpen] = useState(false); //モーダルの表示状態
  
  // これでモーダル開く
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    setIsModalOpen(true);
    setModalSelect(clickInfo);
    document.addEventListener('click', modalClose);
    clickInfo.jsEvent.stopPropagation();
  }, []);

  //モーダルを閉じる
  const modalClose = useCallback(() => {
    setIsModalOpen(false);
    document.removeEventListener('click', modalClose);
  },[])

  useEffect(()=>{
    return ()=>{
      document.removeEventListener('click',modalClose)
    }
  },[modalClose])

  function modalOpen(event:any){
    setIsModalOpen(true)
    document.addEventListener('click',modalClose)
    event.stopPropagation()
  }

  
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
        modalOpen={modalOpen}
        modalClose={modalClose}
        />
        <Sidebar
          calendarRef={calendarRef}
        />
      {/* <button onClick={useGetEvents}>DB一覧取得</button> */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timegrid, interactionPlugin, listPlugin,]}
        headerToolbar={{
          start: "title",
          center: "",
          end: "prev,today,next,timeGridWeek,listMonth",
        }}
        
        buttonText={{
          today: '今月',
          month: '月',
          list: '予定一覧'
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
        // 高さをスクロールしないで表示
        // contentHeight={"auto"}
        
        // eventBackgroundColor={'#FFFFFF'}
        eventBackgroundColor={'#3B82F6'}
        // eventBorderColor={'#acaba9'}
        eventBorderColor={'#e4e4e4'}
        // eventTextColor={'#212121'}
        eventTextColor={'#FFFFFF'}
        // aspectRatio={4.0}
        slotMinTime={'01:00:00'}
        slotMaxTime={'23:00:00'}
      />
    </div>
    </>
  );
};

export default Calendar;