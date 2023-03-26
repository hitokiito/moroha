import { useCallback, useEffect, useState } from "react";
import FullCalendar  from "@fullcalendar/react";
import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { createEventId, INITIAL_EVENTS } from "./event-utils";
import timegrid from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import  Sidebar  from "./Sidebar";
import Modal from "./components/block/Modal";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback((events: EventApi[]) => {
    // console.log("events:", events);  // 確認用
    setCurrentEvents(events);
  }, []);

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const handleWeekendsToggle = useCallback(
    () => setWeekendsVisible(!weekendsVisible),
    [weekendsVisible]
  );

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

  const [isModalOpen, setIsModalOpen] = useState(false); //モーダルの表示状態
  const [modalSelect, setModalSelect] = useState<EventClickArg>(); //モーダルの中身の振り分け

  // これでモーダル開く
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    setIsModalOpen(true);
    setModalSelect(clickInfo);
  }, []);

  //モーダルを閉じる
  const modalClose = () => {
    setIsModalOpen(false);
  };

  const renderEventContent = (eventContent: EventContentArg) => (
    <>
      <i>{eventContent.timeText}</i>
      <i>{eventContent.event.title}</i>
    </>
  );

  const initTest = () => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl!, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        console.log(eventEl);
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("id");
        // console.log(title);
        // console.log(id);
        return {
          title: title,
          id: id
        };
      }
    });
  }


  const events = [
    { title: "Event 100", id: "100" },
    { title: "Event 101", id: "101" },
    { title: "Event 103", id: "103" },
    { title: "Event 104", id: "104" },
    { title: "Event 105", id: "105" }
  ]

  useEffect(() => {
    initTest();
  },[]);


  return (
    <div className="demo-app">
      <Sidebar
        currentEvents={currentEvents}
        toggleWeekends={handleWeekendsToggle}
        weekendsVisible={weekendsVisible}
      />
      <Modal
        modalStatus={isModalOpen}
        content={modalSelect}
        modalClose={modalClose}
      />
      <div
        id="external-events"
        style={{
          padding: "10px",
          width: "10%",
          height: "auto",
          maxHeight: "-webkit-fill-available"
        }}
      >
        <strong> Events</strong>
        {events.map((event) => (
          <div
            className="fc-event"
            id={event.id}
            title={event.title}
            key={event.id}
          >
            <p>{event.id}</p>
            <p>{event.title}</p>
          </div>
        ))}
      </div>


      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timegrid, interactionPlugin, listPlugin,]}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}

          // 日付セルのフォーマット
          eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
          // カレンダー全体のフォーマット
          slotLabelFormat={[{ hour: "2-digit", minute: "2-digit" }]}
          // 現在時刻を赤線で表示する
          nowIndicator={true}
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
          // 既にあるカレンダーをクリックした時
          editable={true}
          eventClick={handleEventClick}
          // カスタマイズした要素を入れられる
          eventContent={renderEventContent}
          // イベント作成中にプレースホルダーとして表示させる
          selectMirror={true}
          // 日付の高さを固定
          dayMaxEvents={true}
          // 日付をクリックで日付へのリンク
          navLinks={true}
          // 範囲外の時間をグレーアウトされる。
          businessHours={{
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '18:00',
            endTime: '21:00'
          }}
          // windowサイズが変わった時にリサイズされる。
          handleWindowResize={true}
          weekends={weekendsVisible}
        />
      </div>
    </div>
  );
}

export default App;