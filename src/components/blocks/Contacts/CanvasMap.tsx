import { Wrapper } from "@googlemaps/react-wrapper";
import { MarkerWithLabel } from "@googlemaps/markerwithlabel";
import { memo, useEffect, useRef } from "react";

function MapComponent({ center, zoom, className, ...props }: { center: google.maps.LatLngLiteral; zoom: number; } & React.HTMLProps<HTMLDivElement>) {

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

function CanvasMap({ center, zoom, ...props }: { center: google.maps.LatLngLiteral; zoom: number; } & React.HTMLProps<HTMLDivElement>) {
  return <Wrapper apiKey={import.meta.env.GOOGLE_API_KEY}>
    <MapComponent center={center} zoom={zoom} {...props} />
  </Wrapper>;
}

export default memo(CanvasMap);