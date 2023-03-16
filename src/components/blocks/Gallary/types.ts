import BlockType from "../../types/BlockType";

export type ControlsType = {
  pages: Array<number>;
  active: number;
  onSelectPage: (page: number) => void;
}

export type ImageType = {
  uid: string;
  headline?: string;
  subheadline?: string;
  bodyHTML?: string;
  image: string | { src: string, alt: string; };
}

export interface GallaryType extends BlockType {
  list: Array<ImageType>;
}