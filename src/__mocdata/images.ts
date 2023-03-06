type ImageType = {
  uid: number;
  src: string;
  title: string;
};

const TITLE = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";

export async function filterImages(): Promise<Array<ImageType>> {

  return new Promise((res) => {
    setTimeout(() => {
      res(new Array(Math.round(8)).fill(1).map(() => ({
        uid: Math.floor(Math.random() * 1000000),
        src: `https://picsum.photos/${Math.round(320 + Math.random() * 800)}/${Math.round(400 + Math.random() * 900)}`,
        title: TITLE.split(/\s+/).slice(Math.round(Math.random() * 5), 5 + Math.round(Math.random() * 5)).join(" "),
      })));
    }, 500);
  });
}