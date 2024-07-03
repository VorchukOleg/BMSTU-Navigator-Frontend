import React, { useState } from 'react';
import { 
  useLoaderData, 
  Outlet,
  Form,
  redirect,
} from "react-router-dom";
import { getAllRooms, getFloorNumbersAndUUIDs,getPath } from "../requests/building-data";
import { markFloors, savePathUUIDs } from '../modules/path_builder.js';
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

  savePathUUIDs(path);
  const fromFloor = markFloors(path.from.floor_uuid, path.to.floor_uuid);

  return redirect(`/floor/${fromFloor}`);
}

export default function Root() {
  const {floorsList, roomsList} = useLoaderData();
  const floors = floorsList.floors;
  const [pathRender, setPathRender] = useState(false);

  return (
    <>
      <FloorNavigation floors={floors} pathRender={pathRender} />
      <Form
        method="post"
        id="route-form" 
        className="navigation_panel_wrapper"
      >
        <RoomSelectors rooms={roomsList} />
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button type="submit" id="search_path" onClick={() => setPathRender(true)}>Найти</button>
          {pathRender ? <button onClick={() => setPathRender(false)} >Сбросить</button> : <></>}
        </div>
      </Form>
      <div className="scheme_container">
        <div className="scheme">
          <svg id="svg">
            <Outlet context={{pathRender}}/>
          </svg>
        </div>
      </div>
    </>
  )
}
