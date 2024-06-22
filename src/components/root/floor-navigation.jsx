import React from 'react';
import { NavLink } from "react-router-dom";

export function FloorNavigation({floors}){
  const newFloors = Object(floors)
  delete newFloors[0]

  return (
    <div className="fieldset">
      {newFloors.map((floor) => {
        return (
          <label key={floor.id}>
            <NavLink
              to={`floor/${floor.floorNumber}`}
              className={({ isActive }) => isActive
                ? 'floor_btn floor_btn--active'
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