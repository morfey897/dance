import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import Directions from "./Directions";
import Schedule from "./Schedule";
import Prices from "./Prices";
import Gallery from "./Gallary";
import Contacts from "./Contacts";
import ClearAnchor from "../elements/ClearAnchor";
import type { HeaderType, FooterType, AboutType, DirectionsType, ScheduleType, PricesType, GallaryType, ContactsType } from "../../types/ui";
import { Provider } from "../providers/EnvProvider";
import { useMemo } from "react";
import { decodeB64 } from "../../utils/base64";

type RootType = {
  header: HeaderType;
  footer: FooterType;
  about: AboutType,
  directions: DirectionsType;
  schedule: ScheduleType;
  prices: PricesType;
  gallary: GallaryType;
  contacts: ContactsType;
};

function Root({ value }: { value: string }) {
  // const data

  const root = useMemo(() => {
    const str: string = decodeB64(value);
    const data = JSON.parse(str);
    return {
      env: {...data.env, IMAGES: new Map(data.env.IMAGES)},
      header: data.header,
      footer: data.footer,
      about: data.about,
      directions: data.directions,
      schedule: data.schedule,
      prices: data.prices,
      gallary: data.gallary,
      contacts: data.contacts,
    }
  }, [value]);


  return <Provider value={{ env: root.env }}>
    <Header {...root.header} />
    <main>
      <About {...root.about} />
      <Directions {...root.directions} />
      <Schedule {...root.schedule} />
      <Prices  {...root.prices} />
      <Gallery {...root.gallary} />
      <Contacts {...root.contacts} />
      <ClearAnchor />
    </main>
    <Footer {...root.footer} />
  </Provider>
}

export default Root;