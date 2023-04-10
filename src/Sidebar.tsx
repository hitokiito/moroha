import { useCallback } from "react";
import { DragAndDropArea } from "./DragAndDropArea";
import useFirebaseEventList from "./hooks/useFirestoreEventAdd";
import { EventApiExtended } from "./types/api/googleCalendar";
import FullCalendar from "@fullcalendar/react";
import SidebarBtn from "./components/atoms/SidebarBtn";

interface Props {
  calendarRef: React.RefObject<FullCalendar>
}

export const Sidebar: React.VFC<Props> = (props) => {
  const { calendarRef } = props;
  // Googleカレンダー登録簡易ロジック
  const { handleEventAdd } = useFirebaseEventList();
  const handleButtonClick = useCallback(() => {
    const calendarApi = calendarRef.current!.getApi();
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
  
  return (
    <div className="demo-app-sidebar">
      <DragAndDropArea />
      <div className="divide-y bg-blue-800 bg-opacity-10 divide-light-blue-400 rounded m-1 p-1">
        <strong className="flex justify-center">CRUDボタン値一覧</strong>
        <SidebarBtn onClick={handleButtonClick} title={"登録"} />
      </div>
    </div>
  )
};

export default Sidebar;

