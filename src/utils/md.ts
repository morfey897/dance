import type { MarkdownInstance } from "astro";

export function getIndex(list: Array<MarkdownInstance<any>>) {
  return (list || []).find((data) =>
    /\/index\.mdx?$/.test(data.file)
  );
}


export function getList(list: Array<MarkdownInstance<any>>) {
  return  (list || []).filter((data) => !/\/index\.mdx?$/.test(data.file));
}

export const sortComparator = (a, b) => {
  const aOrder = parseInt(a.frontmatter["priority"]);
  const bOrder = parseInt(b.frontmatter["priority"]);
  let ao = (isNaN(aOrder) ? 0 : aOrder);
  let bo = (isNaN(bOrder) ? 0 : bOrder);
  return bo - ao;
};