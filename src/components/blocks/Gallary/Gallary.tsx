import Headline from "../../elements/Headline";
import Section from "../../elements/Section";
import Swiper from "./Swiper";
import Controls from "./Controls";
import type { ImageType, GallaryType } from "./types";
import Item from "./Item";

function Gallery({ headline, subheadline, anchor, children, list }: GallaryType) {

  return <Section effect={{ x: 'left' }} anchor={anchor}>
    <Headline headline={headline} subheadline={subheadline}>
      {children}
    </Headline>
    <Swiper<ImageType> items={list} Controls={Controls} Item={Item} />
  </Section >;
}

export default Gallery;