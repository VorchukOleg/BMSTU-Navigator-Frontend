import React from 'react';
import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function FloorNavigation({floors, buildLink, pathRender = false}){
  const newFloors = (initialFloors) => {
    const newFloors = new Array(0);

    initialFloors.forEach(element => {
      if (element !== null && element.floorNumber !== undefined) {
        newFloors.push(element);
      }
    });

    return newFloors;
  };

  const memoFloors = useMemo(
    () => newFloors(floors),
    [floors],
  );

  const isActive = useCallback(
    (link) => buildLink(link) === document.location.pathname + document.location.search,
    [buildLink],
  );

  return (
    <div className="fieldset mt-8">
      {memoFloors.map((floor) => {
        return (
          <label key={floor.id}>
            <Link
              to={buildLink(floor.floorNumber)}
              className={isActive(floor.floorNumber)
                ? (floor?.selected && pathRender)
                  ? 'floor_btn floor_btn--active selected_floor_text'
                  : 'floor_btn floor_btn--active'
                : (floor?.selected && pathRender)
                  ? 'floor_btn selected_floor_text'
                  : 'floor_btn'
              }
              style={isActive(floor.floorNumber)
                ? {pointerEvents: 'none'}
                : {}
              }
            >
              {floor.floorNumber}
            </Link>
          </label>
        );
      })}
    </div>
  );
}
