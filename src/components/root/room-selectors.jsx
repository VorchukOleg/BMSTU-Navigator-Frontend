import React from "react";

export default function RoomSelectors({ rooms }) {
  const options = rooms.select.map((room) => 
    <option 
      value={room.uuid}
      key={room.uuid}
    >
      {room.displayed_name}
    </option>
  )

  return (
    <div className="navigation_panel_wrapper__selectors">
      <div>
        <span>Откуда</span>
        <select name="select-from">
          {options}
        </select>
      </div>
      <div>
        <span>Куда</span>
        <select name="select-to">
          {options}
        </select>
      </div>            
    </div>
  );
}