import React from 'react';
import { 
  useLoaderData, 
  Outlet,
} from "react-router-dom";
import { getAllRooms, getFloorNumbersAndUUIDs } from "../requests/building-data";
import { FloorNavigation }  from '../components/root/floor-navigation.jsx';
import RoomSelectors from '../components/root/room-selectors.jsx';

export async function loader({request}) {
  console.log(request);
  const link = 'http://127.0.0.1:5000';
  const buildingId = '8250b9ba-bc0d-4d2f-abf7-d91265e89050';

  document.title = 'Дом РФ';

  const floorsList = await getFloorNumbersAndUUIDs(link, buildingId);
  const roomsList = await getAllRooms(link, buildingId);
  console.log(floorsList)

  return {floorsList, roomsList};
}

export default function Root() {
  const {floorsList, roomsList} = useLoaderData();
  const floors = floorsList.floors;

  return (
    <>
      <FloorNavigation floors={floors} />
      <div className="navigation_panel_wrapper">
        <RoomSelectors rooms={roomsList} />
        <button id="search_path">Найти</button>
      </div>
      <div className="scheme_container">
        <div className="scheme">
          <svg id="svg">
            <Outlet />
          </svg>
        </div>
      </div>
    </>
  )
}
