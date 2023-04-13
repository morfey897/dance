import type { MarkdownInstance } from "astro";

const generateUid = (data: { group: Array<string> }) => data.group.join("/");

const parseData = (data: MarkdownInstance<any> & { group: Array<string> }) => {
  const frontmatter = data.frontmatter;
  const bodyHTML = data.compiledContent();
  return {
    uid: generateUid(data),
    bodyHTML: bodyHTML || "",
    ...frontmatter,
  };
};

export const sortComparator = (a, b) => {
  const aOrder = parseInt(a.frontmatter["priority"]);
  const bOrder = parseInt(b.frontmatter["priority"]);
  let ao = (isNaN(aOrder) ? 0 : aOrder) - (a.group.length - 1) * 10;
  let bo = (isNaN(bOrder) ? 0 : bOrder) - (a.group.length - 1) * 10;
  return bo - ao;
};

export function prepareGroups(
  list: Array<MarkdownInstance<any> & { group: Array<string> }>
) {
  let result = [];
  list
    .filter((itm) => itm.group[itm.group.length - 1] === "index")
    .forEach((index) => {
      let start = result;
      for (let i = 0; i < index.group.length - 1; i++) {
        let g = index.group[i];
        let item = start.find(({ group }) => group === g);
        if (!item) {
          item = {
            ...parseData(index),
            group: g,
            items: [],
          };
          start.push(item);
        }
        start = item.items;
      }
    });

  list
    .filter((itm) => itm.group[itm.group.length - 1] !== "index")
    .forEach((item) => {
      let start = result;
      for (let i = 0; i < item.group.length - 1; i++) {
        let parent = start.find(({ group }) => group === item.group[i]);
        if (!parent || !Array.isArray(parent.items)) return;
        start = parent.items;
      }
      start.push(parseData(item));
    });
  return result;
}
