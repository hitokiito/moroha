import { EventClickArg } from "@fullcalendar/core";
import React,{ useState,useEffect,VFC } from "react";
import useUpdateEvent from "../../hooks/useUpdateEvent";
import { DocumentPlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import ModalBtn from "../atoms/ModalBtn";

//モーダルの中身
type Props = {
  content: EventClickArg | undefined
  modalClose: () => void;
};

export const ModalContent: React.VFC<Props> = (props) => {
  const { content, modalClose } = props
  const [id, setId] = useState("");
  const [title, setTitle] = useState("タイトル");
  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState("startDate");
  const [startTime, setStartTime] = useState("startTime");
  const [endDate, setEndDate] = useState("endDate");
  const [endTime, setEndTime] = useState("endTime");
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    console.log("ModalContent");
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
      setDateError(false);
    }
  }, [content]);

  
  // const { updateEvent, isLoading, error } = useUpdateEvent(content || undefined);

  // const onUpdateEvent = async () => {
  //   console.log('onUpdateEvent');
  //   console.log(isLoading)
  //   console.log(error)
  //   console.log(content)
  //   if (content !== undefined) {
  //     // setIsLoading(true);
  //     console.log('if');
  //     await updateEvent(content!);
  //     // setIsLoading(false);
  //   }
  // };


  
  // const { updateEvent, isLoading, error } = useUpdateEvent(content!);


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
        modalClose();
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
  const onDeleteEvent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    deleteConfirmEvent();
    return true;
  };
  // 削除ロジック
  const deleteConfirmEvent = () => {
    if (window.confirm("削除しますか？")) {
      if (deleteEvent() === true) {
        window.alert("イベントを削除しました。");
        modalClose();
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      
    validateDateAndTime(event)
    // if(validateDateAndTime(event) == true) {
      // setStateで値が更新されるのは関数が呼び出された後なため、
      // 受け取った値でチェックしないとダメ
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

  // 時刻バリデーション
  // TODO 先に開始時間を操作したい際に毎回エラーメッセージ出るのが微妙。
  // 二段階バリデーションをする
  // 1.問題あれば赤字でエラーメッセージ表示する。
  // 2.編集確定時にエラー表記する。
  const validateDateAndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    let startDay!: Date
    let endDay!: Date
    switch (event.target.name) {
      case 'startDate':
        startDay = new Date(event.target.value + "T" + startTime);
        endDay = new Date(endDate + "T" + endTime);
        break;
      case 'startTime':
        startDay = new Date(startDate + "T" + event.target.value);
        endDay = new Date(endDate + "T" + endTime);
        break;
      case 'endDate':
        startDay = new Date(startDate + "T" + startTime);
        endDay = new Date(event.target.value + "T" + endTime);
        break;
      case 'endTime':
        startDay = new Date(startDate + "T" + startTime);
        endDay = new Date(endDate + "T" + event.target.value);
        break;
    }
    console.log(startDay)
    console.log(endDay)
    if (startDay >= endDay) {
      setDateError(true)
      // alert("開始時間と終了時間を確認してください。");
      return false;
    }
    setDateError(false)
    // if (startDay >= endDay) {
    //   setDateError(true)
    //   alert("開始時間と終了時間を確認してください。");
    //   return false;
    // }
    return true;
  }

 
  return (
    <>
      <form>
        <label className={"block"}>
          ID:
          <input type="text"
            className={"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}
            name="id" value={id} onChange={handleChange} />
        </label>
        <br />
        <label className={"block"}>
          タイトル
          <input type="text"
            className={"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}
            name="title" value={title} onChange={handleChange} />
        </label>
        <br />
      <p className={dateError ? 'text-red-500' : 'invisible'}>開始時間と終了時間を確認してください。</p>
        <label className={"block"}>
          開始日:
          <input type="date"
            className={"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}  
            name="startDate" value={startDate} onChange={handleChange} />
        </label>
        <br />
        <label className={"block"}>
          開始時間:
          <input type="time"
            className={"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}
            name="startTime" value={startTime} step="300" onChange={handleChange} />
        </label>
        <br />
        <label className={"block"}>
          終了日:
          <input type="date"
            className={"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}                
            name="endDate" value={endDate} onChange={handleChange} />
        </label>
        <br />
        <label className={"block"}>
          終了時間:
          <input type="time"
            className={"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}  
            name="endTime" value={endTime} onChange={handleChange} />
        </label>
        <br />
        <label className={"block"}>
          終日フラグ
          <input type="checkbox" checked={allDay}
            className={"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}  
            onChange={() => setAllDay(allDay => !allDay) }
          />
        </label>
        <br />

        <Button className="flex justify-center w-52 bg-blue-500
          rounded transition-all duration-300 ease-out hover:bg-blue-300 cursor-grabbing text-white font-medium m-1 p-1
          flex justify-center" onClick={onEditEvent}>
          <DocumentPlusIcon strokeWidth={2} className="h-5 w-5 " /> 保存
        </Button>

        <Button className="flex justify-center w-52 bg-blue-500
          rounded transition-all duration-300 ease-out hover:bg-blue-300 cursor-grabbing text-white font-medium m-1 p-1
          flex justify-center" onClick={onDeleteEvent}>
          <TrashIcon strokeWidth={2} className="h-5 w-5 " /> 削除
        </Button>
        <button disabled={dateError} className={dateError ? 'bg-gray-600 hover:bg-gray-500 text-white rounded px-4 py-2 opacity-50 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-500 text-white rounded px-4 py-2' } onClick={onEditEvent}>編集</button>
      </form>
    </>
  );
};
export default ModalContent;