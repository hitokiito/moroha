import './App.css';

// import React, { FC } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // pluginは、あとから
import timeGridPlugin from '@fullcalendar/timegrid';
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import { useCallback, useState } from "react";
import { EventApi, EventClickArg } from '@fullcalendar/core';



function App() {
  
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback((events: EventApi[]) => {
    console.log("events:", events);  // 確認用
    setCurrentEvents(events);
  }, []);
  
  
  const thisMonth = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
      )}`;
    }
    

  const handleDateClick = useCallback((arg:DateClickArg) => {
    console.log("handleDateClick")
    // alert(arg)
  }, [])

  const handleEventClick = useCallback((arg:DateClickArg)=> {
    console.log("handleEventClick")
    // console.log(arg)
    // alert(arg..startStr + '~' +  arg.jsEvent.endStr)
  },[])


  // ((arg: EventClickArg) => void) | undefin
  const eventClick = useCallback((arg:EventClickArg)=> {
    console.log(arg.event)
    console.log(arg)
    // console.log(arg)
    // alert(arg..startStr + '~' +  arg.jsEvent.endStr)
  },[])

  
  return (
    <div>
      <FullCalendar 
          locales={allLocales}
          locale="ja"
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
          
          // A name of any of the available views, such as 'dayGridWeek', 'timeGridDay',dayGridMonth 'listWeek' .
          initialView="timeGridWeek" // 初期表示のモードを設定する

          // テストイベント追加
          events={[
            { title: 'sample 20', start: '2023-03-12' },
            { title: 'sample 21', start: '2023-03-13T12:00:00' },
          ]}

          // イベントを編集できるかどうか
          editable= {true}

        
          // dateClickハンドラーは、ユーザーが日付をクリックするたびに呼び出されます。
          dateClick={() => handleDateClick}

          // FullCalendar の DOM のさまざまな場所に挿入できます
          eventContent={() => handleEventClick}

        
          eventClick={() => eventClick}
        
          // 初期化時に呼ばれる。
          eventsSet={() =>handleEvents}
          
          />
    </div>
  );
}


export default App;