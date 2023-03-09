import { useState, useEffect, useMemo } from "react"
import { throttle } from "throttle-debounce";

const isBrowser = () => typeof window === 'object';

const getScrollPercent = () => {
  let h = document.documentElement,
    b = document.body;
  return (h.scrollTop || b.scrollTop) / ((h.scrollHeight || b.scrollHeight) - h.clientHeight);
}

type ScrollDirectionHookResult = {
  direction: 'UP' | 'DOWN' | 'IDLE';
  percent: number;
}

export function useScrollDirection(): ScrollDirectionHookResult {
  const [result, setResult] = useState<ScrollDirectionHookResult>({ direction: 'IDLE', percent: 0 });

  const onScroll = useMemo(() => throttle(400, () => {
    const scrollTop = getScrollPercent();
    setResult(({ percent }) => ({ direction: scrollTop > percent ? 'DOWN' : 'UP', percent: scrollTop }))
  }), []);

  useEffect(() => {
    if (isBrowser()) {
      setResult({ direction: 'IDLE', percent: getScrollPercent() });
      window.addEventListener('scroll', onScroll);
      return () => {
        onScroll.cancel();
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, [])

  return result;
}