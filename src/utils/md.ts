import type { MarkdownInstance } from "astro";

export function getIndex(list: Array<MarkdownInstance<any>>) {
  return (list || []).find((data) =>
    /\/index\.mdx?$/.test(data.file)
  );
}


export function getList(list: Array<MarkdownInstance<any>>) {
  return  (list || []).filter((data) => !/\/index\.mdx?$/.test(data.file));
}