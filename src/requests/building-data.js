import { processPolygonCoordinates } from "../modules/calculate-poligon";
import store from "store";

export async function getFloorNumbersAndUUIDs(link, buildingId) {
  const storeFloors = store.get('floors');

  if(storeFloors !== undefined) {
    return storeFloors;
  }
  
  let response = await fetch(`${link}/floors/${buildingId}`);
  let json = await response.json();
  let ind = 0;
  const transformed = json.reduce((acc, item) => {
    acc.floors[item.floor_number] = {
        floorUUID: item.uuid,
        floorNumber: item.floor_number.toString(),
        id: ind++,
    };
    return acc;
  }, { floors: [] });

  store.set('floors', transformed);
  return transformed;
}

export async function getAllRooms(link, buildingId) {
  const storeRooms = store.get('rooms');

  if(storeRooms !== undefined) {
    return storeRooms;
  }

  console.log(`request all rooms for ${buildingId}`);
  let responseRooms = await fetch(`${link}/get_all_rooms_in_the_building?uuid=${buildingId}`);  

  if (responseRooms.ok) { 
    let jsonRooms = await responseRooms.json()

    let roomsJsonSelect = jsonRooms.rooms;

    const result = {'select' : roomsJsonSelect};
    store.set('rooms', result);
    return result;
  } else {
    alert("Ошибка HTTP: " + responseRooms.status);
  } 
}

export async function requestDataByFloor(link, floorNum) {
  const floors = store.get('floors')
  const floorId = floors.floors[floorNum].floorUUID;

  const storeFloor = store.get(floorId);

  if(storeFloor !== undefined) {
    return storeFloor;
  }

  console.log(`request data for ${floorId}`);
  let response = await fetch(`${link}/floors/get_all?floor_uuid=${floorId}`);
  
  if (response.ok) { 
    let json = await response.json();

    let basenodesJson = json.basenode;
    let roomsJson = json.rooms;

    const basenodesPolygonCoordinates = processPolygonCoordinates(basenodesJson, 'bp_id_');
    const roomPolygonCoordinates = processPolygonCoordinates(roomsJson, 'r_id_');

    const result = {
      "coordinates" : [...basenodesPolygonCoordinates, ...roomPolygonCoordinates],
    };
    store.set(floorId, result);
    return result
  } else {
    alert("Ошибка HTTP: " + response.status);
  } 
}

export async function getPath(link, from, to) {
  let response = await fetch(`${link}/get_path?from=${from}&to=${to}`);
  if (response.ok) { 
      let json = await response.json();
      return json;
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
}