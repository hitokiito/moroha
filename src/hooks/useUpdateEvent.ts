import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { EventClickArg } from '@fullcalendar/core';

interface Event extends gapi.client.calendar.Event {}

const useUpdateEvent = (content: EventClickArg | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  console.log(content);

  useEffect(() => {
    const loadClient = async () => {
      try {
        await gapi.load('client:auth2', () => {
          console.log('gapi.load');

          gapi.client.init({
            clientId: '',
            scope: 'https://www.googleapis.com/auth/calendar',
          });
          console.log('gapi.client.init')

          gapi.client.load('calendar', 'v3', () => {
            console.log('gapi.client.load');
          });
          gapi.auth2.init({
            client_id: '',
            scope: 'https://www.googleapis.com/auth/calendar',
          });
          console.log('gapi.auth2.init');

          gapi.auth2.getAuthInstance().signIn();
          console.log('gapi.auth2.getAuthInstance().signIn()');
        
        });
        const googleUser = await gapi.auth2.getAuthInstance().signIn();
        const accessToken = googleUser.getAuthResponse().access_token;
        console.log(accessToken);
        console.log('accessToken');
        const tokenObject: GoogleApiOAuth2TokenObject = {
          access_token: accessToken,
          expires_in: '3600', // 有効期限(秒)
          error: '', // エラーが発生しなかった場合はnull
          state: '' // 状態が存在しない場合はnull
        };
        
        gapi.auth.setToken(tokenObject);

        gapi.client.load('calendar', 'v3', () => {
          console.log('Calendar API has been loaded successfully.');
      });
      } catch (error) {
        console.log('Error occurred while initializing the GoogleAuth.', error);
      }
    };

    if (typeof gapi !== 'undefined') {
      loadClient();
    }
  }, []);

  const updateEvent = async (content: EventClickArg | undefined) => {
    console.log('start');
    console.log('updateEvent');
    setIsLoading(true);

    try {
      const updateObject: Event = {
        id: content!.event.id,
        summary: content!.event._def.title,
        start: {
          date: content!.event._instance!.range.start.toISOString(),
        },
        end: {
          date: content!.event._instance!.range.end.toISOString(),
        },
      };

      if (content!.event.id) {
        updateObject.id = content!.event.id;
      }

      if (content && content.event._def.title) {
        updateObject.summary = content.event._def.title;
      }

      if (content!.event._instance!.range.start) {
        updateObject.start = {
          dateTime: content!.event._instance!.range.start.toISOString(),
        };
      }

      if (content!.event._instance!.range.end) {
        updateObject.end = {
          dateTime: content!.event._instance!.range.end.toISOString(),
        };
      }

      const googleAuth = gapi.auth2.getAuthInstance();
      if (!googleAuth.isSignedIn.get()) {
        await googleAuth.signIn();
      }

      // const accessToken = googleAuth.currentUser.get().getAuthResponse().access_token;

      await gapi.client.calendar.events.update({
        calendarId: '',
        eventId: content!.event.id,
        resource: updateObject,
      });

      console.log('イベントが更新されました。');
    } catch (error) {
      console.log('エラー', error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
      console.log('finally');
    }
  };

  return { updateEvent, isLoading, error };
};

export default useUpdateEvent;