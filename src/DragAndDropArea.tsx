import { Draggable } from "@fullcalendar/interaction";
import { VFC, memo, useEffect } from "react";
import DragArea from "./DragArea";
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
          width: "100%",
          height: "auto",
          maxHeight: "-webkit-fill-available"
        }}
      >
        <strong className="flex justify-center"> Events</strong>
        <div className="divide-y bg-blue-800 bg-opacity-10 divide-light-blue-400 rounded m-1 p-1">
          {DragEvents.map((dragEvent) => (
            <div
            className="fc-event flex justify-center "
              // id={event.id}
              title={dragEvent.title}
              data-event={dragEvent}
              data-duration={dragEvent.duration}
              key={dragEvent.id}
              >
              <DragArea event={dragEvent}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});