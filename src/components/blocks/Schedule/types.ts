import BlockType from "../../types/BlockType";

export type EventType = {
  uid: string;
  time: string;
  duration: number;
  direction: string;
  gym: string;
  date: string;
  info?: boolean;
}

export type EventsType = Array<{
  date: Date;
  list: EventType[];
}>;

export type DateType = {
  time: string;
  items: Array<EventType | EventType[] | undefined>;
}

export type GridState = {
  now: Date;
  active: Date;
  change: number;
  locale: Locale;
  dates: Array<Date>;
}

export type DateAction = {
  type: 'inc' | 'dec' | 'active' | 'now';
  payload?: Date;
}

export interface ScheduleType extends BlockType {
  timeLabel: string;
}