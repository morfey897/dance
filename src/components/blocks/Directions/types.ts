import BlockType from "../../types/BlockType";

export type DirectionType = {
  uid: string;
  headline: string;
  subheadline?: string;
  bodyHTML?: string;
  image: string;
  groups?: string[]
};

export type ActiveType = {
  c: string;
  p: string;
}

export interface DirectionsType extends BlockType {
 list: Array<DirectionType>;
}