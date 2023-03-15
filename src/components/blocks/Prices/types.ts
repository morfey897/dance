import BlockType from "../../types/BlockType";

interface ElementType {
  uid: string;
  headline: string;
  subheadline?: string;
  bodyHTML?: string;
}

export interface PriceType extends ElementType {
  price?: number;
  oldPrice?: number;
  currency: string;
  top?: boolean;
}

export interface GroupType extends ElementType {
  items: Array<PriceType>;
}

export interface PricesType extends BlockType {
  list: Array<ElementType & {
    items: Array<PriceType | GroupType>
  }>;
}