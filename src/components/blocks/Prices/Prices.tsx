import Section from "../../elements/Section";
import Headline from "../../elements/Headline";
import { GroupItem, Item } from "./Items";
import Group from "./Group";
import { PriceType, PricesType, GroupType } from "./types";
import RenderHTML from "../../elements/RenderHTML";

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