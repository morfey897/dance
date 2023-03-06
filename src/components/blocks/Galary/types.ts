export type ControlsType = {
  pages: Array<number>;
  active: number;
  onSelectPage: (page: number) => void;
}

export type ImageType = {
  uid: number;
  title?: string;
  src: string;
}