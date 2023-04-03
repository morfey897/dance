interface BlockType {
  lang: string;
  headline: string;
  subheadline?: string;
  bodyHTML?: string;
  image?: string | { src: string, alt: string; };
  anchor?: string;
};

export default BlockType;