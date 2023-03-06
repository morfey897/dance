import { useEffect } from "react";
import { useState } from "react";
import Headline from "../../elements/Headline";
import Indicator from "../../elements/IngIndicator";
import Section from "../../elements/Section";
import Swiper from "./Swiper";
import Controls from "./Controls";
import type { ImageType, ControlsType } from "./types";

import { filterImages } from "../../../__mocdata/images";
import Item from "./Item";

const HEADLINE = 'ГАЛЕРЕЯ';

function Gallery() {

  const [images, setImages] = useState<Array<ImageType>>();

  useEffect(() => {
    filterImages()
      .then(list => {
        setImages(list);
      });
  }, []);

  return <Section effect={{ x: 'left' }}>
    <Headline headline={HEADLINE} />
    {!images && <Indicator className="mx-auto mt-12" />}
    <Swiper<ImageType> items={images} Controls={Controls} Item={Item} />
  </Section >;
}

export default Gallery;