import React from 'react';
import { 
  useLoaderData,
} from "react-router-dom";
import { requestDataByFloor } from '../requests/building-data';
import { 
  findPolygonCenter, 
  fontSizeProcessor, 
  calculatePolygonWidthAndHeight } from '../modules/calculate-poligon';
import { PolygonTextElement } from '../components/polygon-text-element.jsx';


export async function loader({params}) {
  const link = 'http://127.0.0.1:5000';
  const floorNum = params.floorNum;

  document.title = `Дом РФ - ${floorNum} этаж`

  const polygonsData = await requestDataByFloor(link, floorNum);

  return {polygonsData};
}

export default function Scheme() {
  const {polygonsData} = useLoaderData();
  const imageSize = 30;
  
  return (
    <g id="floor">
      {polygonsData.coordinates.map((d) => (
        <g key={d.uuid}>
          <polygon
            points={d.coordinates}
            id={d.uuid}
            key={d.uuid}
            className={d.uuid.charAt(0) == 'r'
              ? 'isAud'
              : d.basenode_type == 'Лестница' || d.basenode_type == 'Лифт'
                ? 'isElevatorOrStairs'
                : 'isHall'}
            onMouseOver={d.uuid.charAt(0) == 'r' 
              ? (e) => { e.target.style.fill = '#83bfd3'; } 
              : () => { } }
            onMouseOut={d.uuid.charAt(0) == 'r' 
              ? (e) => { e.target.style.fill = '#ADD8E6'; } 
              : () => { } } 
          />
          {d.uuid.charAt(0) == 'r'
            ? <PolygonTextElement
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
                y={d.uuid !== 'bp_id_6291b50f-05b6-45f4-a41b-fbb4c9e5c961' 
                  && d.uuid !== 'bp_id_2747844c-a00c-403d-8b3d-26d2a80171e5'
                    ? findPolygonCenter(d.coordinates).y - imageSize / 2
                    : d.uuid === 'bp_id_2747844c-a00c-403d-8b3d-26d2a80171e5'
                      ? 210
                      : 215}
                height={imageSize}
                width={imageSize}
                href="/images/stair.svg" 
              />
              : d.basenode_type == 'Лифт'
                && <image
                  x={findPolygonCenter(d.coordinates).x - imageSize / 2}
                  y={findPolygonCenter(d.coordinates).y - imageSize / 2}
                  height={imageSize}
                  width={imageSize}
                  href="/images/elevator.svg" 
                />
          }
        </g>
      ))}
    </g>
  );
}
