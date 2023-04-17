import Header from "./Header";
import Footer from "./Footer";
import { Provider } from "../providers/EnvProvider";
import { useMemo } from "react";
import { decodeB64 } from "../../utils/base64";
import NotFound from "./NotFound";

function Root404({ value }: { value: string }) {

  const root = useMemo(() => {
    const str: string = decodeB64(value);
    const data = JSON.parse(str);

    return {
      env: { ...data.env, IMAGES: new Map(data.env.IMAGES) },
      header: data.header,
      footer: data.footer,
      notFound: data.notFound,
    }
  }, [value]);

  return <Provider value={{ env: root.env }}>
    <Header {...root.header} />
    <main>
      <NotFound {...root.notFound} />
    </main>
    <Footer {...root.footer} />
  </Provider>
}

export default Root404;