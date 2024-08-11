import React from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function FloorNavigation({floors, floorsToDelete, buildLink, pathRender}){
  const newFloors = Object(floors);

  newFloors.map((val, ind) => {
    // eslint-disable-next-line react/prop-types
    if(!val || floorsToDelete.indexOf(val.floorNumber) != -1) {
      delete newFloors[ind];
    }
  });

  return (
    <div className="fieldset mt-8">
      {newFloors.map((floor) => {
        return (
          <label key={floor.id}>
            <NavLink
              to={buildLink(floor.floorNumber)}
              className={({ isActive }) => isActive
                ? (floor?.selected && pathRender)
                  ? 'floor_btn floor_btn--active selected_floor_text'
                  : 'floor_btn floor_btn--active'
                : (floor?.selected && pathRender)
                  ? 'floor_btn selected_floor_text'
                  : 'floor_btn'
              }
              style={({ isActive }) => isActive
                ? {pointerEvents: 'none'}
                : {}
              }
            >
              {floor.floorNumber}
            </NavLink>
          </label>
        );
      })}
    </div>
  );
}
