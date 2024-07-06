import React from 'react';

// eslint-disable-next-line react/prop-types
export default function RoomSelectors({rooms}) {
  // eslint-disable-next-line react/prop-types
  const options = rooms.select.map((room) =>
    <option
      value={room.uuid}
      key={room.uuid}
    >
      {room.displayed_name}
    </option>
  );

  return (
    <div className="navigation_panel_wrapper__selectors">
      <div>
        <span>Откуда</span>
        <select
          className="form-select mt-1 block w-full border-solid border-2 border-sky-500 rounded-lg"
          name="select-from"
        >
          {options}
        </select>
      </div>
      <div>
        <span>Куда</span>
        <select
          className="form-select mt-1 block w-full border-solid border-2 border-sky-500 rounded-lg"
          name="select-to"
        >
          {options}
        </select>
      </div>
    </div>
  );
}
