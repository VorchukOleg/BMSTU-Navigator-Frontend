import store from 'store';

/**
 * Marks from and to floors in the path and returns from floor number.
 * @param {string} fromUUID
 * @param {string} toUUID
 * @return {string}
 */
export function markFloors(buildingCode, fromUUID, toUUID) {
  const floors = store.get(`${buildingCode}/floors`);

  let fromFloor = '';
  floors.floors.forEach((value, ind) => {
    if (value === null) {
      return;
    }

    if (value.floorUUID === fromUUID) {
      fromFloor = value.floorNumber;
      floors.floors[ind].selected = true;

      return;
    }

    if (value.floorUUID === toUUID) {
      floors.floors[ind].selected = true;

      return;
    }

    floors.floors[ind].selected = false;
  });

  store.set(`${buildingCode}/floors`, floors);

  return fromFloor;
}

/**
 * Saves UUIDs of path nodes.
 * @param {object} path
 */
export function savePathUUIDs(path) {
  const pathUUIDs = path.path.map((value) => `bp_id_${value.basenode_uuid}`);
  pathUUIDs.push(`r_id_${path.from.room_uuid}`, `r_id_${path.to.room_uuid}`);

  store.set('path', pathUUIDs);
}

/**
 * Returns path UUIDs.
 * @return {Array}
 */
export function getPathUUIDs() {
  return store.get('path', new Array());
}
