import { EventClickArg } from "@fullcalendar/core";
import React,{ useState,useEffect,VFC } from "react";

import { GetModalContents } from "../../hooks/useModalContents";



//モーダルの中身
type Props = {
  // modalId: string;
  content: EventClickArg | undefined
  // content: EventClickArg;
};

export const ModalContent: React.VFC<Props> = (props) => {

  const content = props.content;
  const [title, setTitle] = useState("タイトル");
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState("startDate");
  const [startTime, setStartTime] = useState("startTime");
  const [endDate, setEndDate] = useState("endDate");
  const [endTime, setEndTime] = useState("endTime");

    // const allDay = modal?.event.allDay;
  useEffect(() => {
    if (content) {
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

  const handleSubmit = (event: any) => {
    console.log("提出");
  };

  return (
    <>
      {content ? (
        <>
          <form onSubmit={handleSubmit}>
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
          </form>
        
          {/* <div>タイトル:{title}</div>
          <div>allDay:{allDay.toString()}</div>
          <div>開始日: {startDate}</div>
          <div>開始時間: {startTime}</div>
          <div>終了日: {endDate}</div>
          <div>終了時間: {endTime}</div> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ModalContent;
