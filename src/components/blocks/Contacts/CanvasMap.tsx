import { MarkerWithLabel } from "@googlemaps/markerwithlabel";
import { memo, useEffect, useRef } from "react";

function CanvasMap({ center, zoom, className, ...props }: { center: google.maps.LatLngLiteral; zoom: number; } & React.HTMLProps<HTMLDivElement>) {

  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    new MarkerWithLabel({
      position: center,
      animation: google.maps.Animation.BOUNCE,
      map: map,
      labelContent: ".",
    })
  }, []);

  return <div className={className} ref={ref} {...props} />;
}

export default memo(CanvasMap);