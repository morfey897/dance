import { useEffect, useState } from "react";
import { filterPrices } from "../../../__mocdata/prices";
import Section from "../../elements/Section";
import Headline from "../../elements/Headline";
import { SubItem, AddItem, Item } from "./Items";
import Group from "./Group";
import { PriceType, AdditionalType } from "./types";
import Indicator from "../../elements/IngIndicator";
import { ANCHORS } from "../../../utils/constants";

const HEADLINE = 'Ціни';
const GROUPS = {
  sub: 'Абонементи',
  add: 'Додаткові можливості'
}
const SUBHEADLINE = '';
const CURRENCY = 'грн';

function Price() {

  const [add, setAdd] = useState<Array<PriceType | AdditionalType>>();
  const [sub, setSub] = useState<Array<PriceType>>();

  useEffect(() => {
    filterPrices()
      .then(prices => {
        setSub(prices.filter((item) => item.group === 'sub').map(item => ({ ...item, currency: CURRENCY })).sort((a, b) => (b.oldPrice || b.price) - (a.oldPrice || a.price)));
        const additional = prices.filter((item) => item.group === 'add').map(item => ({ ...item, currency: CURRENCY }));
        const compose = additional.filter((item) => item.compose);
        setAdd([
          ...compose
            .map((item) => ({
              headline: item.headline,
              subheadline: item.subheadline,
              compose: item.subgroup,
              items: additional.filter((add) => !add.compose && add.subgroup === item.subgroup).sort((a, b) => (a.oldPrice || a.price) - (b.oldPrice || b.price)),
            }))
            .sort((a, b) => b.items.length - a.items.length),
          ...additional.filter((item) => !compose.find((cmp) => cmp.subgroup === item.subgroup)).sort((a, b) => (b.oldPrice || b.price) - (a.oldPrice || a.price))
        ]);
      });
  }, []);

  return <Section effect={{ x: 'right', y: 'bottom' }} anchor={ANCHORS.prc}>
    <Headline headline={HEADLINE} subheadline={SUBHEADLINE} />
    {!add && !sub && <Indicator className="m-auto mt-10" />}
    <div className="space-y-14 mt-12">
      {!!sub && sub.length > 0 && <Group headline={GROUPS.sub}>
        {sub.map((item) => <SubItem key={item.uid} item={item} />)}
      </Group>}

      {!!add && add.length > 0 && <Group headline={GROUPS.add}>
        {add.map((item) => !!(item as AdditionalType).compose ? <AddItem key={(item as AdditionalType).compose} item={item as AdditionalType} /> : <Item key={(item as PriceType).uid} item={item as PriceType} />)}
      </Group>}
    </div>
  </Section>;
}

export default Price;