import React from 'react';

export function PolygonTextElement({ x, y, textAnchor, fill, fontSize, textContent }) {
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
