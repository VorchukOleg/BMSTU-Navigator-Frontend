import { processPolygonCoordinates } from '../modules/calculate-poligon';
import { API_ROUTES } from '../config';
import store from 'store';

export async function getFloorNumbersAndUUIDs(buildingCode) {
  const storeFloors = store.get(`${buildingCode}/floors`);

  if (storeFloors !== undefined) {
    return storeFloors;
  }

  const response = await fetch(API_ROUTES.GET_FLOORS(buildingCode));
  const json = await response.json();
  let ind = 0;
  const transformed = json.reduce(
    (acc, item) => {
      acc.floors[item.floor_number] = {
        floorUUID: item.uuid,
        floorNumber: item.floor_number.toString(),
        id: ind++,
      };

      return acc;
    },
    { floors: [] }
  );

  store.set(`${buildingCode}/floors`, transformed);

  return transformed;
}

export async function getAllRooms(buildingCode) {
  const storeRooms = store.get(`${buildingCode}/rooms`);

  if (storeRooms !== undefined) {
    return storeRooms;
  }

  console.log(`request all rooms for ${buildingCode}`);
  const responseRooms = await fetch(API_ROUTES.GET_ALL_ROOMS(buildingCode));

  if (responseRooms.ok) {
    const jsonRooms = await responseRooms.json();

    const roomsJsonSelect = jsonRooms.rooms;

    const result = { select: roomsJsonSelect };
    store.set(`${buildingCode}/rooms`, result);

    return result;
  } else {
    alert('Ошибка HTTP: ' + responseRooms.status);
  }
}

export async function requestDataByFloor(buildingCode, floorNum) {
  const floors = store.get(`${buildingCode}/floors`);
  const floorId = floors.floors[floorNum].floorUUID;

  const storeFloor = store.get(floorId);

  if (storeFloor !== undefined) {
    return storeFloor;
  }

  console.log(`request data for ${floorId}`);
  const response = await fetch(API_ROUTES.GET_FLOOR_DATA(floorId));

  if (response.ok) {
    const json = await response.json();

    const basenodesJson = json.basenode;
    const roomsJson = json.rooms;

    const basenodesPolygonCoordinates = processPolygonCoordinates(
      basenodesJson,
      'bp_id_'
    );
    const roomPolygonCoordinates = processPolygonCoordinates(
      roomsJson,
      'r_id_'
    );

    const result = {
      coordinates: [...basenodesPolygonCoordinates, ...roomPolygonCoordinates],
    };
    store.set(floorId, result);

    return result;
  } else {
    alert('Ошибка HTTP: ' + response.status);
  }
}

export async function getPath(from, to) {
  const response = await fetch(API_ROUTES.GET_PATH(from, to));
  if (response.ok) {
    const json = await response.json();

    return json;
  } else {
    alert('Ошибка HTTP: ' + response.status);
  }
}
