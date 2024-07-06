'use strict';

const API_HOST = 'http://127.0.0.1:5000';

const BUILDING_IDS = {
  MAB: '', // Main Academic Building
  ELB: '', // Educational and Laratory Building
  RFH: '8250b9ba-bc0d-4d2f-abf7-d91265e89050', // RF House
};

export const BUILDING_NAMES = {
  MAB: 'Главный учебный корпус',
  ELB: 'Учебно-лабораторный корпус',
  RFH: 'Дом РФ',
};

export const API_ROUTES = {
  GET_FLOORS: (buildingCode) =>
    `${API_HOST}/floors/${BUILDING_IDS[buildingCode]}`,
  GET_ALL_ROOMS: (buildingCode) =>
    `${API_HOST}/get_all_rooms_in_the_building?uuid=${BUILDING_IDS[buildingCode]}`,
  GET_FLOOR_DATA: (floorId) =>
    `${API_HOST}/floors/get_all?floor_uuid=${floorId}`,
  GET_PATH: (from, to) => `${API_HOST}/get_path?from=${from}&to=${to}`,
};
