import React from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export function FloorNavigation({floors, pathRender}){
  const newFloors = Object(floors);
  delete newFloors[0];

  return (
    <div className="fieldset mt-8">
      {newFloors.map((floor) => {
        return (
          <label key={floor.id}>
            <NavLink
              to={`floor/${floor.floorNumber}`}
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
