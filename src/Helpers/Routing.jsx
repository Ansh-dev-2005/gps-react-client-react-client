import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(30.3715483, 78.0748676),
      L.latLng(30.3631352, 78.0678565),
      L.latLng(30.3896922, 78.0900722),
      L.latLng(30.3361091, 78.0525185),
      L.latLng(30.3384018, 78.042638),
      L.latLng(30.3517823, 78.0293924),
      L.latLng(30.3834523, 77.9662475),
      L.latLng(30.4134967, 77.9643923),

    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: false,
    addWaypoints: true,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: true,
    
  });
  return instance
};

const Routing = createControlComponent(createRoutineMachineLayer);

export default Routing;
