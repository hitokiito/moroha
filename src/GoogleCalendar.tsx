import { useEffect } from "react";
import ApiCalendar from "react-google-calendar-api";
import { addDays } from "date-fns";
import "./App.css";
import { EventApi, EventInput } from "@fullcalendar/core";
import { gcalendar } from "./types/api/gcalendar";


type Props = {
  // initialEvent: EventInput[] | undefined;
  setInitialEvent: React.Dispatch<React.SetStateAction<EventInput[] | undefined>>;
};

type ListEventsResponse = {
  result: {
    items?: EventInput[];
  };
};


export const GoogleCalendar: React.VFC<Props> = (props) => {

  const setInitialEvent = props.setInitialEvent;

  const config = {
    "apiKey": "",
    "clientId": "",
    "scope": "https://www.googleapis.com/auth/calendar.events",
    "discoveryDocs": ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  };
  
  const getEvents = async () => {
    const calendar = new ApiCalendar(config);
    // 1. 認証チェック
    if (calendar.sign) {
      await calendar.handleAuthClick();
    }

    // 2. イベントの取得
    const events: EventInput[] = await calendar.listEvents({
      timeMin: new Date().toISOString(),
      timeMax: addDays(new Date(), 40).toISOString(),
      showDeleted: true,
      maxResults: 10,
      orderBy: "updated",
    }, "gmail.com")
    .then(({ result }: ListEventsResponse) => {
      if (result.items) {
        console.log("Events From Calendar", result.items);
        return result.items;
      } else {
        console.log("No Events");
        return [];
      }
    });

    return events;
  };
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      // const eventSummaries:{ id: string, summary: string }[]  = events.map(({ id, summary }) => ({ id, summary }));
      const eventSummaries: { id: string, summary: string }[] = events
      .filter(event => event.id && event.summary) // id, summaryがundefinedでないイベントのみを抽出
      .map(({ id, summary }) => ({ id: id!, summary: summary! }));   
      console.log("Event Summaries", eventSummaries);
    };
    fetchEvents();
    }, []);

  return (
    <div className="App">
      <button onClick={getEvents}>Get Events</button>
    </div>
  );
};