const link = 'http://127.0.0.1:5001';

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
        el.setAttribute('class', 'isSelectedAud');
    })

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

async function requestDataByFloor(floorId) {
    console.log(`request data for ${floorId}`);
    let response = await fetch(`${link}/base_nodes/get_base_point?id=${floorId}`);
    if (response.ok) { 
        let json = await response.json();
        const polygonCoordinates = Object.values(json).map((p) => {
          const keys = Object.keys(p.coordinates);
              
          const coord = keys.map((key) => {
              return [p.coordinates[key].x, p.coordinates[key].y];
          });
  
          return {
              id: `bp_id_${p.id}`,
              coordinates: coord
          };
        });

        return polygonCoordinates;
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
}


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
    for (const d of polygonsData) {
        g.setAttribute('id', 'floor')
        var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute('points', d.coordinates);
        polygon.setAttribute('class', '');
        polygon.setAttribute('id', d.id);
        g.appendChild(polygon);
    }
    floorNode.replaceWith(g);
}

async function bootstrap() {
    const floorBtn = document.querySelectorAll('.btn');
    console.log(floorBtn);
    floorBtn.forEach((b) => {
        b.addEventListener('click', handleClickFloorBtn);
    })
}

bootstrap();
