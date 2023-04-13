import Section from "../../elements/Section";
import Headline from "../../elements/Headline";
import { GroupItem, Item } from "./Items";
import Group from "./Group";
import { PriceType, PricesType, GroupType, PropsType } from "../../../types/ui";
import RenderHTML from "../../elements/RenderHTML";
import { filterContent } from "../../../utils/md";
import { translateJSON } from "../../../services/translate";
import { sortComparator, prepareGroups } from "./utils";

export async function getProps({ lang, request, content }: PropsType): Promise<PricesType> {

  const prices = filterContent(content, /\/content\/prices\/(?:[\w\d\/-]+)\.md$/).map((data) => ({
    ...data,
    group: data.file
      .replace(/^.+\/prices\//, "")
      .replace(/\.md$/, "")
      .split("/"),
  }))
    .sort(sortComparator);

  const indexPrice = prices.find(({ group }) => group[0] === "index");
  const items = prepareGroups(prices.filter(({ group }) => group[0] !== "index"));

  const pricesProps = {
    ...indexPrice?.frontmatter,
    list: items,
    bodyHTML: indexPrice?.compiledContent(),
  };

  const translation = await translateJSON(
    {
      target: lang,
      content: {
        prices: pricesProps,
      },
    },
    request
  );

  return {
    ...pricesProps,
    ...translation?.prices,
  } as PricesType;
}

function Price({ anchor, headline, subheadline, bodyHTML, list }: PricesType) {

  return <Section effect={{ x: 'right', y: 'bottom' }} anchor={anchor}>
    <Headline headline={headline} subheadline={subheadline}>
      <RenderHTML>{bodyHTML}</RenderHTML>
    </Headline>
    <div className="space-y-14 mt-12">
      {list?.map(data => <Group headline={data.headline} key={data.uid}>
        {
          data.items?.map((el) => {
            let child = (el as GroupType).items;
            return !child || !Array.isArray(child) || child.length === 0 ? <Item key={el.uid} item={el as PriceType} /> :
              <GroupItem key={el.uid} item={el as GroupType} />;
          })
        }
      </Group>)}
    </div>
  </Section>;
}

export default Price;