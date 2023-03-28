import { Draggable } from "@fullcalendar/interaction";
import { VFC, memo, useEffect } from "react";
import { createEventId, DRAG_EVENTS } from "./event-utils";


type Props = {
};

const initTest = () => {
  let draggableEl = document.getElementById("external-events");
  new Draggable(draggableEl!, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      // console.log(eventEl);
      let id = createEventId();
      let title = eventEl.getAttribute("title");
      let duration = eventEl.getAttribute("data-duration");
      console.log(title);
      console.log(id);
      console.log(duration);
      return {
        title: title,
        id: id,
        duration: duration
      };
    }
  });
}


export const DragAndDropArea: VFC<Props> = memo(props => {
  // const { children } = props;
  const DragEvents = DRAG_EVENTS;
  useEffect(() => {
    initTest();
  }, []);
  
  return (
    <>
      <div
        id="external-events"
        style={{
          padding: "10px",
          width: "30%",
          height: "auto",
          maxHeight: "-webkit-fill-available"
        }}
      >
        <strong> Events</strong>
        <div className="flex items-end h-screen grid">
        {/* pyの値で高さ変わる */}
        <div className="relative py-20 px-1 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
            {/* <span className="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-indigo-800 text-white"></span> */}
            <div className="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-indigo-800 text-white">イベント5</div>
            <div className="inline-flex item-end">イベント5</div>
        </div>
          <div className="py-1">01</div>
          <div className="py-12">02</div>
          <div className="py-8">03</div>
        </div>
        <div className="h-screen grid grid-cols-6 grid-rows-3">
          <div className="bg-red-100"></div>
          <div className="bg-red-200"></div>
          <div className="bg-red-300"></div>
          <div className="bg-red-400"></div>
          <div className="bg-red-500"></div>
        </div>
        {DragEvents.map((dragEvent) => (
          <div
            className="fc-event"
            // id={event.id}
            title={dragEvent.title}
            data-event={dragEvent}
            data-duration={dragEvent.duration}
            key={dragEvent.id}
          >
            {/* <p>{event.id}</p> */}
            
            {/* <a className="relative py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" href="#">
              Notifications
              <span className="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-indigo-800 text-white">5</span>
            </a> */}
            <p>{dragEvent.title}</p>
            {/* <p>{event.duration}</p> */}
          </div>
        ))}
      </div>
    </>
  );
});