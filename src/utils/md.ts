import type { MarkdownInstance } from "astro";
export function getIndex(list: Array<MarkdownInstance<any>>) {
  return list.find((data) =>
    /\/index\.md?$/.test(data.file)
  );

}