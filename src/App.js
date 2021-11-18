import "./App.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { createRef, useEffect } from "react";

import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  const mapContainer = createRef();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [34.34, 40.42],
      zoom: 0,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    map.addControl(directions, "top-left");
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", function () {
      directions.setOrigin(urlParams.get("orig") || "");
      directions.setDestination(urlParams.get("dest") || "");
    });
  }, [mapContainer]);

  return (
    <div className="app">
      <div className="map-wrapper" ref={mapContainer}></div>
    </div>
  );
}

export default App;
