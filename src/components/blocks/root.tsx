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
import { withEnv } from "../providers/EnvProvider";

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

function Root({ root }: { root: RootType }) {
  return <>
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
  </>
}

export default withEnv<{ root: RootType }>(Root);