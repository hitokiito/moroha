import { EventApi, formatDate } from "@fullcalendar/core";
import { DragAndDropArea } from "./DragAndDropArea";

interface Props {
  currentEvents: EventApi[];
  toggleWeekends: () => void;
  weekendsVisible: boolean;
}
const renderSidebarEvent = (event: EventApi) => (
  <li key={event.id}>
    <p>{event.id}</p>
    <b>
      {formatDate(event.start!, {
        year: "numeric",
        month: "short",
        day: "numeric",
        locale: "ja",
      })}
    </b>
    <i>{event.title}</i>
  </li>
);
const Sidebar: React.VFC<Props> = ({
  currentEvents,
  toggleWeekends,
  weekendsVisible,
}) => (
  <div className="demo-app-sidebar">
    <div className="demo-app-sidebar-section">
      <label>
        <input
          type="checkbox"
          checked={weekendsVisible}
          onChange={toggleWeekends}
        />
        週末を表示
      </label>
    </div>
    <DragAndDropArea/>
  </div>
);

export default Sidebar;