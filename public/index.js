import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";


import { 
    findPolygonCenter,
    calculatePolygonWidthAndHeight,
    fontSizeProcessor, 
} from "../src/modules/calculate-poligon.js";
import {
    getFloorNumbersAndUUIDs,
    getPath,
    requestDataByFloor
} from "../src/requests/building-data.js"
import {Menu, MENU_RENDER_TYPES} from "./components/FloorNavigationButtonGroup/FloorNavigationButtonGroup.js";

const rootElement = document.getElementById('root');

const link = 'http://127.0.0.1:5000';
const buildingId = '8250b9ba-bc0d-4d2f-abf7-d91265e89050'

const floorsList = await getFloorNumbersAndUUIDs(link, buildingId);

const menu = new Menu(rootElement, floorsList);

function renderMenu() {
    menu.render(MENU_RENDER_TYPES.TEMPLATE);
}

class FloorState {
    constructor() {
        this.globalState = {}
    }

    setFloorState(floor, key, value) {
        this.globalState[floor] = this.globalState[floor] || {};
        this.globalState[floor][key] = value;
    }

    pushDelayedRender(floor, value) {
        this.globalState[floor] = this.globalState[floor] || {};
        this.globalState[floor]['delayed_display'] = this.globalState[floor]['delayed_display'] || [];
        this.globalState[floor]['delayed_display'].push(value);
    }

   
    getFloorState(floor, key) {
        return this.globalState[floor] ? this.globalState[floor][key] : undefined;
    }

    resetFloorState(key) {
        for (let floor in this.globalState) {
            if (this.globalState[floor].hasOwnProperty(key)) {
                delete this.globalState[floor][key];
            }
        }
    }

    resetFloorStateForFloor(floor, key) {
       
        delete this.globalState[floor][key];
       
    }
}


const state = new FloorState();
let currentFloorUUID = -1;
let isSelectFilled = false;
const SVG = document.getElementById('svg');
const selectFrom = document.getElementById('select-from');
const selectTo = document.getElementById('select-to');

async function handleSearch() {
  const data = state.getFloorState(currentFloorUUID, 'json_coordinates');
  renderPolygons(data, currentFloorUUID, true);
  state.resetFloorState('delayed_display');   
  for (const floorNumber in floorsList.floors) {
    if (floorsList.floors.hasOwnProperty(floorNumber)) {
        const floorUUID = floorsList.floors[floorNumber].floor_uuid;
        if (floorUUID != currentFloorUUID){
          state.setFloorState(floorUUID, 'need_clear', true)
          
        } 
    }
  }

  const pathFrom = selectFrom.value;
  const pathTo = selectTo.value;

  const path = await getPath(link, pathFrom, pathTo);
  path.path.forEach((item) => {
    if (currentFloorUUID == item.floor_uuid) {
        const el = document.getElementById(`bp_id_${item.basenode_uuid}`);
        el.setAttribute('class', 'isSelectedHall');
    } else {
    state.pushDelayedRender(item.floor_uuid, item.basenode_uuid)
    }
  
  })
  const from = path.from;
  const to = path.to;

  for (const floorNumber in floorsList.floors) {
    if (floorsList.floors.hasOwnProperty(floorNumber)) {
        const floorUUID = floorsList.floors[floorNumber].floor_uuid;
        console.log(floorUUID);
        const elementFloorNumber = document.getElementById(floorUUID);
        if (floorUUID == from.floor_uuid){
            elementFloorNumber.setAttribute('class', 'selected_floor_text');
        } else if (floorUUID == to.floor_uuid) {
            elementFloorNumber.setAttribute('class', 'selected_floor_text');
        } else if (elementFloorNumber.classList.contains('selected_floor_text')) {
            elementFloorNumber.classList.remove('selected_floor_text');
        }
    }
  }

    //   const fromFloorNumber = document.getElementById(from.floor_uuid);
    //   const toFloorNumber = document.getElementById(to.floor_uuid);
    
    //   fromFloorNumber.setAttribute('class', 'selected_floor_text');
    //   toFloorNumber.setAttribute('class', 'selected_floor_text');
  
  if (currentFloorUUID == from.floor_uuid) {
      const departure = document.getElementById(`r_id_${from.room_uuid}`);
      departure.setAttribute('class', 'isSelectedAud');
  } else {
    state.setFloorState(from.floor_uuid, 'departure', from.room_uuid) 
  }

  if (currentFloorUUID == to.floor_uuid) {
      const destination = document.getElementById(`r_id_${to.room_uuid}`);
      destination.setAttribute('class', 'isSelectedAud');
  } else {
      state.setFloorState(to.floor_uuid, 'destination', to.room_uuid) 
  }
}

function delayedRender(floor_uuid) {
    const roomArray = state.getFloorState(floor_uuid, 'delayed_display')
    if (typeof roomArray !== "undefined") {
        roomArray.forEach((basenode_uuid) => {
            const el = document.getElementById(`bp_id_${basenode_uuid}`);
            el.setAttribute('class', 'isSelectedHall');
        })
        state.resetFloorStateForFloor(floor_uuid, 'delayed_display', )
    } 
    
    const departureState = state.getFloorState(floor_uuid, 'departure')
    if (typeof departureState !== "undefined") {
        const departure = document.getElementById(`r_id_${departureState}`);
        departure.setAttribute('class', 'isSelectedAud');
        state.resetFloorStateForFloor(floor_uuid, 'departure', )
    }

    const destinationState = state.getFloorState(floor_uuid, 'destination')
    if (typeof destinationState !== "undefined") {
        const destination = document.getElementById(`r_id_${destinationState}`);
        destination.setAttribute('class', 'isSelectedAud');
        state.resetFloorStateForFloor(floor_uuid, 'destination', )
    }
  
}

const searchButton = document.getElementById('search_path');
searchButton.addEventListener('click', handleSearch)

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }

async function handleClickFloorBtn(e) {
    console.log('handle click');
    const floorNum = e.target.value;
    currentFloorUUID = floorNum
    let data = state.getFloorState(floorNum, 'json_coordinates');

    if (!data) {
        data = await requestDataByFloor(link, buildingId, floorNum);
        state.setFloorState(floorNum, 'json_coordinates', data);
        
    }

    const needClear = state.getFloorState(floorNum, 'need_clear')
    if (typeof needClear !== "undefined")
    {
      renderPolygons(data, floorNum, needClear);
      state.setFloorState(floorNum, 'need_clear', false)
    } else {
      renderPolygons(data, floorNum, needClear);
    }
    
}

function TextElement({x, y, textAnchor, fill, fontSize, textContent}) {
    return (
        <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            fill={fill}
            fontSize={fontSize}
        >
            {textContent}
        </text>
    );
 }


const floorNode = document.getElementById('svg');
const root = createRoot(floorNode);

// рендеринг полиногов
function renderPolygons(polygonsData, floorNum, resetFloor) {
    console.log('data rendering');
    // const floorNode = document.getElementById('floor');
    
    
    let renderedState = state.getFloorState(floorNum, 'planDOM');
    if (!renderedState || resetFloor) {
        const imageSize = 30;
        const g = (
            <g id="floor">
                {polygonsData.coordinates.map((d) => (
                    <g key={d.uuid}>
                        <polygon
                            points={d.coordinates}
                            id={d.uuid}
                            key={d.uuid}
                            className={
                                d.uuid.charAt(0) == 'r' 
                                ? 'isAud'
                                : d.basenode_type == 'Лестница' || d.basenode_type == 'Лифт'
                                ? 'isElevatorOrStairs'
                                : 'isHall'
                            }
                            onMouseOver={d.uuid.charAt(0) == 'r' ? (e) => {e.target.style.fill = '#83bfd3';} : () => {}}
                            onMouseOut={d.uuid.charAt(0) == 'r' ? (e) => {e.target.style.fill = '#ADD8E6';} : () => {}}
                        />
                        {
                            d.uuid.charAt(0) == 'r'
                            ? <TextElement 
                                x={findPolygonCenter(d.coordinates).x} 
                                y={findPolygonCenter(d.coordinates).y} 
                                textAnchor={"middle"} 
                                fill={"black"}
                                fontSize={fontSizeProcessor(calculatePolygonWidthAndHeight(d.coordinates))}
                                textContent={d.displayed_name}
                            />
                            : d.basenode_type == 'Лестница'
                            ? <image
                                x={findPolygonCenter(d.coordinates).x - imageSize / 2}
                                y={d.uuid !== 'bp_id_6291b50f-05b6-45f4-a41b-fbb4c9e5c961' && d.uuid !=='bp_id_2747844c-a00c-403d-8b3d-26d2a80171e5'
                                    ? findPolygonCenter(d.coordinates).y - imageSize / 2
                                    : d.uuid ==='bp_id_2747844c-a00c-403d-8b3d-26d2a80171e5'
                                    ? 210
                                    : 215
                                }
                                height={imageSize}
                                width={imageSize}
                                href="stair.svg"
                            />
                            : d.basenode_type == 'Лифт'
                            && <image
                                x={findPolygonCenter(d.coordinates).x - imageSize / 2}
                                y={findPolygonCenter(d.coordinates).y - imageSize / 2}
                                height={imageSize}
                                width={imageSize}
                                href="elevator.svg"
                            />
                        }
                    </g>
                ))
                }
            </g>
        );
        root.render(g)
        setTimeout(() => delayedRender(floorNum), 100)
        state.setFloorState(floorNum, 'planDOM', g);  
    } else {
        // floorNode.replaceWith(renderedState);
        root.render(renderedState)
        setTimeout(() => delayedRender(floorNum), 100)
        state.setFloorState(floorNum, 'planDOM', renderedState); 
    }

    //removeOptions(selectFrom);
    //removeOptions(selectTo);

    if (!isSelectFilled) {
        for (let item of polygonsData.select) {
            const option_text = item.displayed_name;
            const option_id = item.uuid;
            
            const optionFrom = document.createElement("option");
            optionFrom.appendChild(document.createTextNode(option_text));
            optionFrom.setAttribute("value", option_id);
            selectFrom.appendChild(optionFrom);
            
            const optionTo = document.createElement("option");
            optionTo.appendChild(document.createTextNode(option_text));
            optionTo.setAttribute("value", option_id);
            selectTo.appendChild(optionTo);
        }
        isSelectFilled = true
    }
}

async function bootstrap() {
    const floorBtn = document.querySelectorAll('.floor_btn');
    floorBtn.forEach((b) => {
        b.addEventListener('click', handleClickFloorBtn);
    })
}

async function initialFloor() {
    console.log('handle click');
    const floorNum = '2d37f5c4-9d6c-4e28-ae66-40a1f3e3347f';
    currentFloorUUID = floorNum
    let data = state.getFloorState(floorNum, 'json_coordinates');

    if (!data) {
        data = await requestDataByFloor(link, buildingId, floorNum);
        state.setFloorState(floorNum, 'json_coordinates', data);
        
    }

    await renderPolygons(data, floorNum, false);
}

renderMenu();
bootstrap();
await initialFloor();

const radioBtn = document.querySelector('.floor_btn');
radioBtn.checked = true;
