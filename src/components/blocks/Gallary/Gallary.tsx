import Headline from "../../elements/Headline";
import Section from "../../elements/Section";
import Swiper from "./Swiper";
import Controls from "./Controls";
import type { ImageType, GallaryType } from "./types";
import Item from "./Item";
import RenderHTML from "../../elements/RenderHTML";

function Gallery({ headline, subheadline, anchor, bodyHTML, list }: GallaryType) {

  return <Section effect={{ x: 'left' }} anchor={anchor}>
    <Headline headline={headline} subheadline={subheadline}>
      <RenderHTML>{bodyHTML}</RenderHTML>
    </Headline>
    <Swiper<ImageType> items={list} Controls={Controls} Item={Item} autoScroll={5} startAt={1} />
  </Section >;
}

export default Gallery;