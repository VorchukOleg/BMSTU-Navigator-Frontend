const link = 'http://127.0.0.1:5000';

class State {
    constructor() {
        this.globalState = {}
    }

    setState(key, value) {
        this.globalState[key] = value
    }

    getState(key) {
       return this.globalState[key];
    }
}

const state = new State();

const SVG = document.getElementById('svg');



const selectFrom = document.getElementById('select-from');
const selectTo = document.getElementById('select-to');

async function handleSearch(e) {
    const pathFrom = selectFrom.value;
    const pathTo = selectTo.value;
    path = await getPath(pathFrom, pathTo);


    path.path.forEach((id) => {
        const el = document.getElementById(`bp_id_${id}`);
        el.setAttribute('class', 'isSelectedHall');
    })
    const from = path.from;
    const to = path.to; 
    const departure = document.getElementById(`r_id_${from}`);
    const destination = document.getElementById(`r_id_${to}`);
    departure.setAttribute('class', 'isSelectedAud');
    destination.setAttribute('class', 'isSelectedAud');

}

const searchButton = document.getElementById('search_path');
searchButton.addEventListener('click', handleSearch)

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
    let response = await fetch(`${link}/floors/get_all?floor_id=${floorId}`);
    
    if (response.ok) { 
        let json = await response.json();

        let basenodesJson = json.basenode;
        let roomsJson = json.rooms;

        const basenodesPolygonCoordinates = processPolygonCoordinates(basenodesJson, 'bp_id_');
        const roomPolygonCoordinates = processPolygonCoordinates(roomsJson, 'r_id_');

        return {
            "coordinates" : [...roomPolygonCoordinates, ...basenodesPolygonCoordinates],
            "select" : roomsJson
        };
    } else {
        alert("Ошибка HTTP: " + response.status);
    } 
}

const processPolygonCoordinates = (data, idPrefix) => 
    Object.values(data).map(p => {
        const coord = Object.keys(p.coordinates).map(key => [p.coordinates[key].x, p.coordinates[key].y]);
        return { id: `${idPrefix}${p.id}`, coordinates: coord };
    });



async function handleClickFloorBtn(e) {
    console.log('handle click');
    const floorNum = e.target.value;
    let data = state.getState(floorNum);

    if (!data) {
        data = await requestDataByFloor(floorNum);
        state.setState(floorNum, data);
        
    }
    renderPolygons(data);
}

// рендеринг полиногов
function renderPolygons(polygonsData) {
    console.log('data rendering');
    const floorNode = document.getElementById('floor');
    
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    for (const d of polygonsData.coordinates) {
        g.setAttribute('id', 'floor')
        var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute('points', d.coordinates);
        polygon.setAttribute('class', '');
        polygon.setAttribute('id', d.id);
        g.appendChild(polygon);
    }
    floorNode.replaceWith(g);

    removeOptions(selectFrom);
    removeOptions(selectTo);
    for (let item of polygonsData.select) {
        const option_text = item.displayed_name;
        const option_id = item.id;
        
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
