
import Section from "../../elements/Section";

import type { NotFoundType, PropsType } from "../../../types/ui";
import RenderHTML from "../../elements/RenderHTML";

import { filterContent } from "../../../utils/md";
import { concatPaths } from "../../../utils/url";
import { translateJSON } from "../../../services/translate";
import { useEnv } from "../../providers/EnvProvider";

export async function getProps({ content, lang, request }: PropsType): Promise<NotFoundType> {

  const indexNotFound = filterContent(content, /\/content\/404\.md$/)[0];

  const indexProps = {
    ...indexNotFound?.frontmatter,
    bodyHTML: indexNotFound?.compiledContent(),
  };

  const translation = await translateJSON(
    {
      target: lang,
      content: {
        notFound: indexProps,
      },
    },
    request
  );

  return {
    ...indexProps,
    ...translation?.notFound,
  } as NotFoundType;
}

function NotFound({ headline, bodyHTML, cta }: NotFoundType) {

  const env = useEnv();

  return <Section
    className="text-center pt-[74px] pb-[124px] md:pt-[274px] md:pb-[270px]"
    effect={{ x: "left" }}
  >
    <div className="text-center">
      <h1 className="uppercase text-4xl md:text-6xl mt-14">{headline}</h1>
      <div className={"text-sm md:text-lg mt-7 max-w-screen-lg m-auto"}>
        <RenderHTML>{bodyHTML}</RenderHTML>
      </div>
      <a
        aria-label={"home page"}
        href={concatPaths(cta.href || "/", env.LANG)}
        className="group space-x-2 block w-fit m-auto mt-7 text-sm md:text-lg text-center border-2 border-pnk-200 rounded-3xl py-2 px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 active:border-pnk-100 active:shadow active:shadow-pnk-100"
      >
        <span className="inline-block">{cta.label}</span>
        <svg
          className="animate-bounce inline-block fill-pnk-100 group-hover:animate-none"
          height="24px"
          width="24px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <g>
            <g>
              <g>
                <path
                  d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
    c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
    z"
                ></path>
                <path
                  d="M347.582,198.248L256,289.83l-91.582-91.582c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17
    l106.667,106.667c8.331,8.331,21.839,8.331,30.17,0l106.667-106.667c8.331-8.331,8.331-21.839,0-30.17
    C369.42,189.917,355.913,189.917,347.582,198.248z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </a>
    </div>
  </Section>;
}

export default NotFound;