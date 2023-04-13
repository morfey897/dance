import { useMemo } from "react";
import { concatPaths } from "../../utils/url";
import { useValue } from "../providers/EnvProvider";

export function Picture({ image, alt: alternative, src: resource, section, ...props }: { image?: string | { src: string; alt?: string }; section?: string; } & React.ImgHTMLAttributes<HTMLPictureElement>) {

  const { env: { CDN_PROVIDER, IMAGES } } = useValue();

  const rest = useMemo<{ src: string; alt: string; mobileSrc: string; }>(() => {
    const isObject = typeof image === 'object';
    const isString = typeof image === 'string';
    let src = resource;
    let alt = alternative;
    if (isObject) {
      src = image.src;
      alt = image.alt ?? alternative;
    } else if (isString) {
      src = image;
      alt = alternative;
    }

    const isImageId = !!src && !/^(:?https?:)?\/{2}/.test(src);

    if (isImageId) {
      let imageID = src;
      if (!/^[\d\w]+-[\d\w]+-[\d\w]+-[\d\w]+-[\d\w]+$/.test(src)) {
        const key = concatPaths(section && !(new RegExp(`^\/?${section}\/`).test(src)) ? `/${section}` : "/", src);
        imageID = IMAGES.get(key);
      }
      return {
        src: concatPaths(CDN_PROVIDER, imageID, 'public'),
        mobileSrc: concatPaths(CDN_PROVIDER, imageID, 'mobile'),
        alt: alt || ''
      }
    }

    return {
      src: src,
      mobileSrc: '',
      alt: alt || ''
    }

  }, [image, alternative, resource]);

  return <picture  {...props}>
    <source media="(max-width: 425px)" srcSet={rest.mobileSrc} />
    <source media="(min-width: 426px)" srcSet={rest.src} />
    <img src={rest.src} alt={rest.alt} loading='lazy' decoding="async" />
  </picture>;
}

export default Picture;