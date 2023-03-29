export type gcalendar = {
  created: string;
  creator: {
    email: string;
    self: boolean;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  etag: string;
  eventType: string;
  htmlLink: string;
  iCalUID: string;
  id: string;
  kind: string;
  organizer: {
    email: string;
    self: boolean;
  };
  sequence: number;
  start: {
    dateTime: string;
    timeZone: string;
  };
  status: string;
  summary: string;
  updated: string;
}