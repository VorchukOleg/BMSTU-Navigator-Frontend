import React, { useState } from 'react';
import {
  useLoaderData,
  Outlet,
  Form,
  redirect,
} from 'react-router-dom';
import { BUILDING_NAMES } from '../config.js';
import { getAllRooms, getFloorNumbersAndUUIDs,getPath } from '../requests/building-data';
import { markFloors, savePathUUIDs } from '../modules/path_builder.js';
import FloorNavigation from '../components/root/floor-navigation.jsx';
import RoomSelectors from '../components/root/room-selectors.jsx';

export async function loader({params}) {
  const buildingCode = params.buildingCode;

  document.title = `${BUILDING_NAMES[buildingCode]}`;

  const floorsList = await getFloorNumbersAndUUIDs(buildingCode);
  const roomsList = await getAllRooms(buildingCode);

  return {floorsList, roomsList, buildingCode};
}

export async function action({request, params}) {
  const formData = await request.formData();

  const pathFrom = formData.get('select-from');
  const pathTo = formData.get('select-to');

  const path = await getPath(pathFrom, pathTo);

  savePathUUIDs(path);
  const fromFloor = markFloors(params.buildingCode, path.from.floor_uuid, path.to.floor_uuid);

  return redirect(`floor/${fromFloor}`);
}

export default function Building() {
  const {floorsList, roomsList, buildingCode} = useLoaderData();
  const floors = floorsList.floors;
  const [pathRender, setPathRender] = useState(false);

  const buildFloorLink = (floorNum) => {
    return `floor/${floorNum}`;
  };

  return (
    <>
      <h1 className="mt-4 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-5xl">
        {BUILDING_NAMES[buildingCode]}
      </h1>
      <FloorNavigation floors={floors} floorsToDelete={[0]} buildLink={buildFloorLink} pathRender={pathRender} />
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
  );
}
