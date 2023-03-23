import { EventApi, EventClickArg } from "@fullcalendar/core";
import React,{ useState,useEffect,VFC } from "react";

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
  const [id, setId] = useState("");
  const [title, setTitle] = useState("タイトル");
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState("startDate");
  const [startTime, setStartTime] = useState("startTime");
  const [endDate, setEndDate] = useState("endDate");
  const [endTime, setEndTime] = useState("endTime");

  useEffect(() => {
    if (content) { 
      setId(content!.event.id ?? "");
      setTitle(content!.event._def.title ?? "")
      const start = content!.event._instance!.range.start.toISOString() ?? "";
      const end = content!.event._instance!.range.end.toISOString() ?? "";
      const [startDate, startTime] = start!.replace(/\.\d{1,3}Z$/, '').split('T') ?? "";
      const [endDate, endTime] = end!.replace(/\.\d{1,3}Z$/, '').split('T') ?? "";
      setStartDate(startDate);
      setStartTime(startTime);
      setEndDate(endDate);
      setEndTime(endTime);
      setAllDay(content.event.allDay);
    }
  }, [content]);

  // TODO エラー回避のため一時的な処理
  if (!content) {
    return (
      <></>
    )
  }


  // 変更時のイベント作成
  const onEditEvent = (e: any) => {
    e.preventDefault();
    const event = {
      id: id,
      title: title,
      start: startDate + "T" + startTime,
      end: endDate + "T" + endTime
    }
    // deleteEvent(event)
    editConfirmEvent(event);
  };
  // 編集
  const editConfirmEvent = (ev: any) => {
    if (window.confirm("変更しますか？")) {
      if (editEvent(ev) === true) {
        window.alert("イベントを変更しました。");
      }
    } else {
      return;
    }
  }
  // 編集ロジック 削除してから追加
  const editEvent = (ev: any) => {
    content.view.calendar.getEventById(ev.id)!.remove();
    content.view.calendar.addEvent(ev);
    return true;
  }
  

  // 削除
  const onDeleteEvent = (e: any) => {
    e.preventDefault();
    deleteConfirmEvent();
    return true;
  };
  // 削除ロジック
  const deleteConfirmEvent = () => {
    if (window.confirm("削除しますか？")) {
      if (deleteEvent() === true) {
        window.alert("イベントを削除しました。");
      } 
    } else {
      return;
    }
  }

  // 編集ロジック 削除してから追加
  const deleteEvent = () => {
    content.view.calendar.getEventById(id)!.remove();
    return true;
  }

  // 入力された内容を反映させる
  const handleChange = (event: any) => {
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
      case 'endDate':
        setEndDate(event.target.value);
        break;
      case 'endTime':
        setEndTime(event.target.value);
        break;
    }
  };

  return (
    <>
      {content ? (
        <>
          <form>
            <label>
              ID:
              <input type="text" name="id" value={id} onChange={handleChange} />
            </label>
            <br />
            <label>
              タイトル
              <input type="text" name="title" value={title} onChange={handleChange} />
            </label>
            <br />
            <label>
              開始日:
              <input type="date" name="startDate" value={startDate} onChange={handleChange} />
            </label>
            <br />
            <label>
              開始時間:
              <input type="time" name="startTime" value={startTime} step="300" onChange={handleChange} />
            </label>
            <br />
            <label>
              終了日:
              <input type="date" name="endDate" value={endDate} onChange={handleChange} />
            </label>
            <br />
            <label>
              終了時間:
              <input type="time" name="endTime" value={endTime} onChange={handleChange} />
            </label>
            <br />
            <label>
              終日フラグ
            <input type="checkbox" checked={allDay} 
              onChange={() => setAllDay(allDay => !allDay) }
            />
            </label>
            <br />
            <button onClick={onDeleteEvent}>削除</button>
            <button onClick={onEditEvent}>編集</button>
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ModalContent;