import { EventInput } from '@fullcalendar/core';
import { useEffect, useState } from 'react';

interface GoogleEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}

interface UseGoogleCalendarReturn {
  googleEvents: EventInput[];
  loading: boolean;
  error: Error | null;
}

const useGoogleCalendar = (calendarId: string, apiKey: string): UseGoogleCalendarReturn => {
  const [googleEvents, setGoogleEvents] = useState<EventInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGoogleEvents = async () => {
      try {
        const now = new Date();
        const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10).toISOString();
        const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10).toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${minDate}&timeMax=${maxDate}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch Google Calendar events');
        }

        const { items } = await response.json();
        const mappedEvents: EventInput[] = items.map((event: GoogleEvent) => ({
          id: event.id,
          title: event.summary,
          start: event.start.dateTime,
          end: event.end.dateTime,
        }));
        console.log(mappedEvents)
        setGoogleEvents(mappedEvents);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchGoogleEvents();
  }, [calendarId, apiKey]);

  return { googleEvents, loading, error };
};

export default useGoogleCalendar;