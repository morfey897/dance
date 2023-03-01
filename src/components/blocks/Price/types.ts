export type PriceType = {
  uid: number;
  headline: string;
  subheadline?: string;
  price: number;
  oldPrice?: number;
  currency: string;
  top?: boolean;
}

export type AdditionalType = {
  headline: string;
  subheadline?: string;
  compose: string;
  items: Array<PriceType>;
}