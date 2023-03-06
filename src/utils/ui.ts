export const SCROLL_EPS = 0.1;

export const smoothScroll = (index: number, root: HTMLElement | null, behavior: 'auto' | 'smooth' = 'smooth'): Promise<void> => new Promise((resolve: Function) => {
  if (!root) return resolve();
  const items = root.children;
  if (index < 0 || index >= items.length) return resolve();
  const element = items[index];
  if (!element || typeof element.scrollIntoView !== 'function') return resolve(false);
  let same = 0;
  let lastPos: number | null = null;
  const rootRect = root.getBoundingClientRect();
  element.scrollIntoView({
    block: 'center',
    behavior,
    inline: 'center'
  });

  function check() {
    const elementRect = element.getBoundingClientRect();
    if (elementRect.left === lastPos) {
      if (same++ > 3) {
        const rootCenter = rootRect.x + rootRect.width / 2;
        const elementCenter = elementRect.x + elementRect.width / 2;
        if (rootCenter != elementCenter) {
          root.scrollTo({ left: root.scrollLeft + rootCenter - elementCenter, behavior });
        }
        return resolve();
      }
    } else {
      same = 0;
      lastPos = elementRect.left;
    }
    requestAnimationFrame(check);
  }

  requestAnimationFrame(check);
});

export const calculateScale = (root: HTMLElement | null): Array<number> => {
  if (!root) return [];
  const rect: DOMRect = root.getBoundingClientRect();
  const center = rect.x + rect.width / 2;
  const totalSize = rect.width;
  const len = root.children.length;
  if (len <= 0) return [];
  return new Array(len).fill(0).map((_, index) => {
    let children = root.children[index];
    let rect = children.getBoundingClientRect();
    const rowScale = Math.round(((1 - Math.abs(rect.x + rect.width / 2 - center) / totalSize) + SCROLL_EPS) * 100) / 100;
    const scale = rowScale > 1 ? 1 : (rowScale <= SCROLL_EPS ? SCROLL_EPS : rowScale);
    return scale;
  });
};