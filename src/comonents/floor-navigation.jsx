import React from 'react';
import { NavLink } from "react-router-dom";

export function FloorNavigation({floors}){
  return (
    <div className="fieldset">
      {floors.map((floor) => {
        return (
          <label key={floor.id}>
            <NavLink
              to={`floor/${floor.floorUUID}`}
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