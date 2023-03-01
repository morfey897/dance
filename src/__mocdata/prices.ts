type PriceType = {
  uid: number;
  group: 'sub' | 'add';
  subgroup?: string;
  compose?: boolean;
  headline: string;
  subheadline?: string;
  price: number;
  oldPrice?: number;
};
const PRICES: Array<PriceType> = [{
  uid: Math.floor(Math.random() * 1000000),
  group: 'sub',
  headline: '12 заннять',
  subheadline: 'В абонемент входить одне тренування у группі, дія абонементу 30 днів з моменту придбання',
  price: 1350,
  oldPrice: 1400,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'sub',
  headline: '8 заннять “30 днів”',
  subheadline: 'В абонемент входить одне тренування у группі, дія абонементу 30 днів з моменту придбання',
  price: 1200,
  oldPrice: 1500,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'sub',
  headline: '4 заннять',
  subheadline: 'В абонемент входить одне тренування у группі, дія абонементу 30 днів з моменту придбання',
  price: 550,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'add',
  subgroup: 'indiv',
  headline: 'Персональні тренування',
  subheadline: 'В абонемент входить одне тренування у группі, дія абонементу 30 днів з моменту придбання',
  compose: true,
  price: 0,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'add',
  subgroup: 'indiv',
  headline: '1 година (1 людина)',
  price: 450,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'add',
  subgroup: 'indiv',
  headline: '1 година (2 людина)',
  price: 550,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'add',
  subgroup: 'indiv',
  headline: '1,5 години',
  price: 650,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'add',
  subgroup: 'indiv',
  headline: 'Абонемент на 5 годин',
  price: 2100,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'add',
  subgroup: 'rent',
  headline: 'Оренда залу',
  subheadline: 'В абонемент входить одне тренування у группі, дія абонементу 30 днів з моменту придбання',
  compose: true,
  price: 0,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'add',
  subgroup: 'rent',
  headline: '1 година',
  price: 200,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'add',
  subgroup: 'newOne',
  headline: '1 година',
  subheadline: 'Test new one',
  price: 300,
}, {
  uid: Math.floor(Math.random() * 1000000),
  group: 'add',
  subgroup: 'newOne',
  headline: '2 година',
  subheadline: 'Test new two',
  price: 400,
  oldPrice: 500,
}]

export async function filterPrices():Promise<Array<PriceType>> {
  return new Promise((res) => {
    setTimeout(() => {
      res(PRICES);
    }, 500)
  });
}