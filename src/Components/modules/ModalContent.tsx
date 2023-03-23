import { EventApi, EventClickArg } from "@fullcalendar/core";
import React,{ useState,useEffect,VFC } from "react";
import { start } from "repl";

import { GetModalContents } from "../../hooks/useModalContents";



//モーダルの中身
type Props = {
  // modalId: string;
  content: EventClickArg | undefined
  currentEvents: EventApi[]
  setCurrentEvents:React.Dispatch<React.SetStateAction<EventApi[]>>
  // content: EventClickArg;
};

export const ModalContent: React.VFC<Props> = (props) => {
  
  const content = props.content;
  const { currentEvents, setCurrentEvents } = props;
  // console.log(clickInfo.event.id);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("タイトル");
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState("startDate");
  const [startTime, setStartTime] = useState("startTime");
  const [endDate, setEndDate] = useState("endDate");
  const [endTime, setEndTime] = useState("endTime");

    // const allDay = modal?.event.allDay;
  useEffect(() => {
    if (content) { 
      setId(content!.event.id ?? "");
      setTitle(content!.event._def.title ?? "")
      const start = content!.event._instance!.range.start.toISOString() ?? "";
      const end = content!.event._instance!.range.end.toISOString() ?? "";
      const [startDate, startTime] = start!.replaceAll('-', '/').replace(/\.\d{1,3}Z$/, '').split('T') ?? "";
      const [endDate, endTime] = end!.replaceAll('-', '/').replace(/\.\d{1,3}Z$/, '').split('T') ?? "";
      // const allDay = modal?.event.allDay;
      setStartDate(startDate);
      setStartTime(startTime);
      setEndDate(endDate);
      setEndTime(endTime);
    }
  }, [content]);


  


  
  // TODO エラー回避のため一時的な処理
  if (!content) {
    return (
      <></>
    )
  }
  
  // タイトルだけ変更可能にしておく
  const handleChange = (event: any) => {
    // console.log(event);
    console.log(currentEvents);
    switch (event.target.name) {
      case 'title':
        setTitle(event.target.value);
        break;
      case 'startDate':
        setStartDate(event.target.value);
        break;
      case 'startTime':
        setStartTime(event.target.value);
        break;
    }
  };

  // 変更時のイベント作成
  // 今はそのまま実行される。
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const event = {
      id: id,
      title: title,
      start: "2020-05-23 10:00:00",
      end: endDate,
    }
    deleteEvent(event)
  };
  
  // 削除
  const deleteEvent = (ev: any) => {
    console.log("changeEvent通過");
    console.log("押下対象Id" + ev.id);
    // カレンダーオブジェクト取得して削除
    const CalAPI = content.view.calendar
    console.log(CalAPI.getEventById(ev.id));
    CalAPI.getEventById(ev.id)!.remove();
    return true;
  };

  return (
    <>
      {content ? (
        <>
          <form>
          {/* <form onSubmit={handleSubmit} onClick={handleSubmit}> */}
            <label>
              ID(テスト表示用)
              <input type="text" name="id" value={id} onChange={handleChange} />
            </label>
            <br />
            <label>
              Title:
              <input type="text" name="title" value={title} onChange={handleChange} />
            </label>
            <br />
            <label>
              開始日:
              <input type="text" name="startDate" value={startDate} onChange={handleChange} />
            </label>
            <br />
            <label>
              開始時刻:
              <input type="text" name="startDate" value={startTime} onChange={handleChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
            <button onClick={handleSubmit}>dejaaaaaaaaaa</button>
          </form>
        
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ModalContent;
