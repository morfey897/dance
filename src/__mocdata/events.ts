import { addDays, compareAsc, differenceInDays } from "date-fns";

const toDate = (d: Date) => d.toISOString().split('T')[0];

const NOW = new Date(toDate(new Date()));

type EventType = {
  uid: number;
  time: string;
  direction: string;
  gym: string;
  hasInfo?: boolean;
}

const DIRECTIONS = ['PoleDance', 'Stretching', 'Exot', 'Hils'];
const GYM = ['Gym #1', 'Gym #2', 'Gym #3', 'Gym'];
const TIMES = ['08:00', '09:15', '10:30', '11:30', '13:00', '14:00', '15:20', '16:30', '17:30', '19:00', '20:00', '21:00',];

const EVENTS: Array<{ date: string; list: Array<EventType> }> = new Array(21).fill(0).map((_, index) => {
  return {
    date: toDate(addDays(NOW, index - 10)),
    list: new Array(Math.floor(Math.random() * 12)).fill(0).map(() => {
      return {
        uid: Math.floor(Math.random() * 1000000),
        time: TIMES[Math.floor(Math.random() * TIMES.length)],
        direction: DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)],
        gym: GYM[Math.floor(Math.random() * GYM.length)],
        hasInfo: Math.random() > .7,
      };
    })
  };
})

export async function fetchEvents(start: string, end: string): Promise<Array<{ date: string; list: Array<EventType> }>> {

  return new Promise((res) => {
    setTimeout(() => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      res(new Array(differenceInDays(endDate, startDate) + 1).fill(0).map((_, index) => {
        let d = addDays(startDate, index);
        return EVENTS.find(({ date }) => date === toDate(d));
      }));
    }, 500);
  });
}


// fetchEvents(new Date().toISOString(), addDays(new Date(), 5).toISOString())
//   .then((data) => console.log(data));
