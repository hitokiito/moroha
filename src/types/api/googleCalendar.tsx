import { EventApi } from '@fullcalendar/core';

export interface EventApiExtended extends Pick<EventApi, "id"> {
  title?: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  startEditable?: boolean;
  durationEditable?: boolean;
  resourceEditable?: boolean;
  rendering?: string;
  overlap?: boolean;
  constraint?: any;
  source?: any;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps?: any;
  duration?: string;
}