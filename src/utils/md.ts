import type { MarkdownInstance } from "astro";

export function filterContent(content: Array<MarkdownInstance<any>> | undefined | null, pattern: RegExp | Array<RegExp | ((str: string) => boolean)>) {
  return Array.isArray(content) ? content.filter((f) => Array.isArray(pattern) ? pattern.every(p => typeof p === 'function' ? p(f.file) : p.test(f.file)) : pattern.test(f.file)) : [];
}

export function getFileName(file: string | MarkdownInstance<any>) {
  if (!file) return;
  let name = typeof file === 'string' ? file : file.file;
  return name.match(/\/([^\/]+)\.md?$/)[1];
}

export function getIndex(list: Array<MarkdownInstance<any>>) {
  if (list && list.length === 1) return list[0];
  return (list || []).find((data) =>
    /\/index\.mdx?$/.test(data.file)
  );
}

export function getList(list: Array<MarkdownInstance<any>>) {
  return (list || []).filter((data) => !/\/index\.mdx?$/.test(data.file));
}

export const sortComparator = (a, b) => {
  const aOrder = parseInt(a.frontmatter["priority"]);
  const bOrder = parseInt(b.frontmatter["priority"]);
  let ao = (isNaN(aOrder) ? 0 : aOrder);
  let bo = (isNaN(bOrder) ? 0 : bOrder);
  return bo - ao;
};