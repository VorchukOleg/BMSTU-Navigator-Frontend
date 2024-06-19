import { processPolygonCoordinates } from "../modules/calculate-poligon";

export async function getFloorNumbersAndUUIDs(link, buildingId) {
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

return transformed
}

export async function requestDataByFloor(link, buildingId, floorId) {
  console.log(`request data for ${floorId}`);
  let response = await fetch(`${link}/floors/get_all?floor_uuid=${floorId}`);
  let responseRooms = await fetch(`${link}/get_all_rooms_in_the_building?uuid=${buildingId}`);
  
  if (response.ok) { 
      let json = await response.json();
      let jsonRooms = await responseRooms.json()

      let basenodesJson = json.basenode;
      let roomsJsonSelect = jsonRooms.rooms;
      let roomsJson = json.rooms;

      const basenodesPolygonCoordinates = processPolygonCoordinates(basenodesJson, 'bp_id_');
      const roomPolygonCoordinates = processPolygonCoordinates(roomsJson, 'r_id_');

      return {
          "coordinates" : [...basenodesPolygonCoordinates, ...roomPolygonCoordinates],
          "select" : roomsJsonSelect
      };
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