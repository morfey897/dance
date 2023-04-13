import { useMemo } from "react";
import { concatPaths } from "../../utils/url";

export function Image({ image, section, alt: alternative, src: resource, ...props }: { image?: string | { src: string; alt?: string }; section?: string; } & React.ImgHTMLAttributes<HTMLImageElement>) {

  const rest = useMemo<{ src: string; alt: string; }>(() => {
    const isObject = typeof image === 'object';
    const isString = typeof image === 'string';
    let src = resource;
    let alt = '';
    if (isObject) {
      src = image.src;
      alt = image.alt ?? alternative;
    } else if (isString) {
      src = image;
      alt = alternative;
    }

    return {
      src: !src || /^(:?https?:)?\/{2}/.test(src) ? src : concatPaths(section && !(new RegExp(`^\/?${section}\/`).test(src)) ? `/${section}` : "/", src),
      alt: alt || ''
    }

  }, [image, section, alternative, resource]);

  return <img {...rest} loading='lazy' {...props} />
}

export default Image;