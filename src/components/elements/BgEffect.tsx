import clsx from "clsx";

function BGEffect(props: React.HTMLProps<HTMLOrSVGElement>) {
  return (
    <svg className={clsx("absolute z-0 left-0 top-[-50px] md:top-[-270px] md:left-[-50px]", props.className)} viewBox="0 0 1549 1368" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.2" filter={`url(#filter0_f_6_37_${props.name})`}>
        <path d="M1172 633.262C1308.5 910.262 996.239 940.762 811.5 940.762C366.5 1153.71 0 904.859 0 789.708C88.5 520.708 766 268.762 1036.5 363.262C1205.5 479.762 1172 518.11 1172 633.262Z" fill="#FF00A8" />
      </g>
      <defs>
        <filter id={`filter0_f_6_37_${props.name}`} x="-343" y="0" width="1891.54" height="1367.1" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="171.5" result="effect1_foregroundBlur_6_37" />
        </filter>
      </defs>
    </svg>
  );
}

export default BGEffect;