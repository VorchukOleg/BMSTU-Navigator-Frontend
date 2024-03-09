const link = 'http://127.0.0.1:5000';

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

const buildingId = '8250b9ba-bc0d-4d2f-abf7-d91265e89050'
const state = new FloorState();
let currentFloorUUID = -1;
const SVG = document.getElementById('svg');
const selectFrom = document.getElementById('select-from');
const selectTo = document.getElementById('select-to');

async function handleSearch() {
    const pathFrom = selectFrom.value;
    const pathTo = selectTo.value;

    path = await getPath(pathFrom, pathTo);
    path.path.forEach((item) => {
        const el = document.getElementById(`bp_id_${item.basenode_uuid}`);
        if (currentFloorUUID == item.floor_uuid) {
            el.setAttribute('class', 'isSelectedHall');
        } else {
          state.pushDelayedRender(item.floor_uuid, item.basenode_uuid)
        }
   
    })
    const from = path.from;
    const to = path.to; 
    const departure = document.getElementById(`r_id_${from}`);
    const destination = document.getElementById(`r_id_${to}`);
    departure.setAttribute('class', 'isSelectedAud');
    destination.setAttribute('class', 'isSelectedAud');

}

function delayedRender(floor_uuid) {
    roomArray = state.getFloorState(floor_uuid, 'delayed_display')
    if (typeof roomArray === "undefined") {
        return
    }
    roomArray.forEach((basenode_uuid) => {
        const el = document.getElementById(`bp_id_${basenode_uuid}`);
        el.setAttribute('class', 'isSelectedHall');
    })
    state.resetFloorStateForFloor(floor_uuid, 'delayed_display', )
}

async function handleReset() {
    state.resetFloorState('planDOM');
}

const searchButton = document.getElementById('search_path');
searchButton.addEventListener('click', handleSearch)

const resetButton = document.getElementById('reset_state');
resetButton.addEventListener('click', handleReset)

async function getPath(from, to) {
    let response = await fetch(`${link}/get_path?from=${from}&to=${to}`);
    if (response.ok) { 
        let json = await response.json();
        return json;
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
}

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }


async function requestDataByFloor(floorId) {
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
            "coordinates" : [...roomPolygonCoordinates, ...basenodesPolygonCoordinates],
            "select" : roomsJsonSelect
        };
    } else {
        alert("Ошибка HTTP: " + response.status);
    } 
}

const processPolygonCoordinates = (data, idPrefix) => 
    Object.values(data).map(p => {
        const coord = Object.keys(p.coordinates).map(key => [p.coordinates[key].x, p.coordinates[key].y]);
        return { uuid: `${idPrefix}${p.uuid}`, coordinates: coord };
    });



async function handleClickFloorBtn(e) {
    console.log('handle click');
    const floorNum = e.target.value;
    currentFloorUUID = floorNum
    let data = state.getFloorState(floorNum, 'json_coordinates');

    if (!data) {
        data = await requestDataByFloor(floorNum);
        state.setFloorState(floorNum, 'json_coordinates', data);
        
    }
    renderPolygons(data, floorNum);
}

// рендеринг полиногов
function renderPolygons(polygonsData, floorNum) {
    console.log('data rendering');
    const floorNode = document.getElementById('floor');

    let renderedState = state.getFloorState(floorNum, 'planDOM');
    if (!renderedState) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        for (const d of polygonsData.coordinates) {
            console.log(d)
            g.setAttribute('id', 'floor')
            var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute('points', d.coordinates);
            polygon.setAttribute('class', '');
            polygon.setAttribute('id', d.uuid);
            g.appendChild(polygon);
        }
        floorNode.replaceWith(g);
        delayedRender(floorNum)
        state.setFloorState(floorNum, 'planDOM', g);  
    } else {
        floorNode.replaceWith(renderedState);
        delayedRender(floorNum)
        state.setFloorState(floorNum, 'planDOM', g); 
    }

    removeOptions(selectFrom);
    removeOptions(selectTo);
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
}

async function bootstrap() {
    const floorBtn = document.querySelectorAll('.btn');
    console.log(floorBtn);
    floorBtn.forEach((b) => {
        b.addEventListener('click', handleClickFloorBtn);
    })
}

bootstrap();
