import { EventClickArg } from "@fullcalendar/core";

interface EventData {
  id: string;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

function useEventData(content: EventClickArg): EventData {
  const id = content!.event.id ?? "";
  const title = content!.event._def.title ?? ""
  const start = content!.event._instance!.range.start.toISOString() ?? "";
  const end = content!.event._instance!.range.end.toISOString() ?? "";
  const [startDate, startTime] = start!.replace(/\.\d{1,3}Z$/, '').split('T') ?? "";
  const [endDate, endTime] = end!.replace(/\.\d{1,3}Z$/, '').split('T') ?? "";

  return {
    id,
    title,
    startDate,
    startTime,
    endDate,
    endTime,
  };
}

export default useEventData;