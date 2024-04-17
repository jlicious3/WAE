import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ address }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyB1ZT4U3Lp54ULB9svth2rfSD_JCyqH2xE", // Replace with your Google Maps API key
      version: "weekly",
    });

    loader.load().then(() => {
      const geocoder = new google.maps.Geocoder();
      
      // Geocode the address to get its location
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const location = results[0].geometry.location;

          // Create a map centered at the location of Saskatchewan
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: 51.7267, lng: -104.6473 }, // Coordinates for Saskatchewan
            zoom: 6,
          });
          
          // Place a marker at the location of the address
          new google.maps.Marker({
            map: map,
            position: location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  }, [address]);

  return <div style={{ height: "350px" }} ref={mapRef} />;
}

export default Map;
