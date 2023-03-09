import { useEffect, useMemo } from "react";
import { throttle } from "throttle-debounce";

const isBrowser = () => typeof window === 'object';

function ClearAnchor() {

  const onScroll = useMemo(() => throttle(400, () => {
    const hash = window.location.hash;
    if (hash) {
      window.history.replaceState(
        null,
        "",
        window.location.href.replace(hash, "")
      );
    }
  }), []);

  useEffect(() => {
    if (isBrowser()) {
      window.addEventListener("scroll", onScroll);
      return () => {
        onScroll.cancel();
        window.removeEventListener("scroll", onScroll);
      }
    }
  }, []);

  return null;
}

export default ClearAnchor;