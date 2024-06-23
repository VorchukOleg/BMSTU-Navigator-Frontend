import React from 'react';
import { 
  useLoaderData, 
  Outlet,
  Form,
} from "react-router-dom";
import { getAllRooms, getFloorNumbersAndUUIDs,getPath } from "../requests/building-data";
import { FloorNavigation }  from '../components/root/floor-navigation.jsx';
import RoomSelectors from '../components/root/room-selectors.jsx';

export async function loader() {
  const link = 'http://127.0.0.1:5000';
  const buildingId = '8250b9ba-bc0d-4d2f-abf7-d91265e89050';

  document.title = 'Дом РФ';

  const floorsList = await getFloorNumbersAndUUIDs(link, buildingId);
  const roomsList = await getAllRooms(link, buildingId);

  return {floorsList, roomsList};
}

export async function action({request}) {
  const formData = await request.formData();

  const link = 'http://127.0.0.1:5000';
  const pathFrom = formData.get('select-from');
  const pathTo = formData.get('select-to');

  const path = await getPath(link, pathFrom, pathTo);
}

export default function Root() {
  const {floorsList, roomsList} = useLoaderData();
  const floors = floorsList.floors;

  return (
    <>
      <FloorNavigation floors={floors} />
      <Form
        method="post"
        id="route-form" 
        className="navigation_panel_wrapper"
      >
        <RoomSelectors rooms={roomsList} />
        <button type="submit" id="search_path">Найти</button>
      </Form>
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
