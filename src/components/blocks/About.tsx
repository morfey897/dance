const HEADLINE = 'Cтудия POLE DANCE';
const SUBHEADLINE = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.';
const CTA = {
  label: 'Prices',
  href: "#prices"
}

function About() {
  return <section className="w-full bg-black bg-[url('/background.png')] bg-cover pt-[74px] relative z-10">
    <div className="max-w-screen-xl mx-auto px-4 text-center pt-4 pb-16">
      <img className="m-auto md:p-0 px-10" loading="lazy" src='/kalipso-image.png' alt='' />
      <h1 className="uppercase text-3xl md:text-9xl mt-14">{HEADLINE}</h1>
      <p className="text-sm md:text-lg mt-7 max-w-screen-lg m-auto">{SUBHEADLINE}</p>
      <a href={CTA.href} className={'block w-fit m-auto mt-7 text-sm md:text-lg text-center border-2 border-pnk-200 rounded-3xl py-2 px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 active:border-pnk-100 active:shadow active:shadow-pnk-100'}>
        {CTA.label}
      </a>
    </div>
  </section>
}

export default About;