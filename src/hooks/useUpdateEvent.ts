import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { EventClickArg } from '@fullcalendar/core';

interface Event {
  id: string;
  summary?: string;
  start?: {
    dateTime: string;
  };
  end?: {
    dateTime: string;
  };
  location?: string;
  description?: string;
}

const useUpdateEvent = (content: EventClickArg | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  console.log(content);

  useEffect(() => {
    const initClient = async () => {
      try {
        await gapi.client.init({
          apiKey: '',
          clientId: '',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar',
        });
        console.log('gapi client initialized');
      } catch (error) {
        console.log('gapi client initialization error', error);
      }
    };
    initClient();
  }, []);

  const updateEvent = async (content: EventClickArg | undefined) => {
    console.log('start')
    console.log('updateEvent');
    setIsLoading(true);
    try {
      const updateObject: Event ={
        id: ''
      };

      if (content!.event.id) {
        updateObject.id = content!.event.id
      }


      if (content && content.event._def.title) {
        updateObject.summary = content.event._def.title;
      }
      

      if (content!.event._instance!.range.start) {
        // content!.event._instance!.range.start.toISOString() ?? ""
        updateObject.start = {
          dateTime: content!.event._instance!.range.start.toISOString(),
        };
      }

      if (content!.event._instance!.range.end) {
        updateObject.end = {
          dateTime: content!.event._instance!.range.end.toISOString(),
        };
      }

      // if (event.location) {
      //   updateObject.location = event.location;
      // }

      // if (event.description) {
      //   updateObject.description = event.description;
      // }

      await gapi.client.calendar.events.update({
        calendarId: 'itt.pedro5328@gmail.com',
        eventId: content!.event.id,
        resource: updateObject,
      });
      console.log('イベントが更新されました。');
    } catch (error) {
      console.log('エラー');
      console.log(error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
      console.log('finally');
    }
  };

  return { updateEvent, isLoading, error };
};

export default useUpdateEvent;