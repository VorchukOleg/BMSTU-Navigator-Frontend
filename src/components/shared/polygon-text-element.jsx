import React from 'react';

// eslint-disable-next-line react/prop-types
export default function PolygonTextElement({x, y, textAnchor, fill, fontSize, textContent}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill={fill}
      fontSize={fontSize}
    >
      {textContent}
    </text>
  );
}
