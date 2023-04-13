import Headline from "../../elements/Headline";
import Section from "../../elements/Section";
import Swiper from "./Swiper";
import Controls from "./Controls";
import type { ImageType, GallaryType, PropsType } from "../../../types/ui";
import Item from "./Item";
import RenderHTML from "../../elements/RenderHTML";
import { translateJSON } from "../../../services/translate";
import { filterContent, sortComparator, getFileName } from "../../../utils/md";

export async function getProps({ lang, request, content }: PropsType):Promise<GallaryType> {
  
  const indexDirection = filterContent(content, /\/content\/gallary\/index\.md$/)[0];
  const list = filterContent(content, [/\/content\/gallary\/(?:[\w\d\/-]+)\.md$/, (file) => indexDirection?.file != file]);
  
  const childrenList = list.sort(sortComparator).map((data) => {
    const uid = getFileName(data);
    const frontmatter = data.frontmatter;
    return {
      uid,
      headline: "",
      subheadline: "",
      bodyHTML: data.compiledContent(),
      ...frontmatter,
    };
  });
  
  const gallaryProps = {
    ...indexDirection?.frontmatter,
    list: childrenList,
    bodyHTML: indexDirection?.compiledContent(),
  };
  
  const translation = await translateJSON(
    {
      target: lang,
      content: {
        gallary: gallaryProps,
      },
    },
    request
  );
  
  return {
    ...gallaryProps,
    ...translation?.gallaryProps,
  } as GallaryType;
}

function Gallery({ headline, subheadline, anchor, bodyHTML, list }: GallaryType) {

  return <Section effect={{ x: 'left' }} anchor={anchor}>
    <Headline headline={headline} subheadline={subheadline}>
      <RenderHTML>{bodyHTML}</RenderHTML>
    </Headline>
    <Swiper<ImageType> items={list} Controls={Controls} Item={Item} autoScroll={5} startAt={1} />
  </Section >;
}

export default Gallery;