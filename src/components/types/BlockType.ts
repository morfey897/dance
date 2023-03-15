interface BlockType {
  headline: string;
  subheadline?: string;
  children?: React.ReactNode;
  image?: string | { src: string, alt: string; };
  anchor?: string;
};

export default BlockType;