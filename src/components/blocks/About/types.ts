import type BlockType from "../../types/BlockType";
export interface AboutType extends BlockType {
  cta?: {
    label: string;
    href: string;
  }
}