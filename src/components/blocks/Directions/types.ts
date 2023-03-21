import BlockType from "../../types/BlockType";

export type DirectionType = {
  uid: string;
  headline: string;
  subheadline?: string;
  bodyHTML?: string;
  image: string;
  groups?: string[]
};

export interface DirectionsType extends BlockType {
 list: Array<DirectionType>;
}