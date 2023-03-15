import { useMemo } from "react";

export function Image({ image, block, alt: alternative, src: resource, ...props }: { image?: string | { src: string; alt?: string }; block?: string; } & React.ImgHTMLAttributes<HTMLImageElement>) {

  const rest = useMemo<{ src: string; alt: string; }>(() => {
    const isObject = typeof image === 'object';
    const isString = typeof image === 'string';
    let src = resource;
    let alt = '';
    if (isObject) {
      src = image.src;
      alt = image.alt;
    } else if (isString) {
      src = image;
      alt = alternative;
    }

    return {
      src: !src || /^(:?https?:)?\/{2}/.test(src) ? src : `/${(block && !(new RegExp(`(?:^|\/)${block}\/`).test(src)) ? block : "") || ""}/${src}`.replace(/\/{2,}/g, "/"),
      alt: alt || ''
    }

  }, [image, block, alternative, resource]);

  return <img {...rest} loading='lazy' {...props} />
}

export default Image;