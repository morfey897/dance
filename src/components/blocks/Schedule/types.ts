
export type EventType = {
  uid: number;
  time: string;
  direction: string;
  gym: string;
  hasInfo?: boolean;
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