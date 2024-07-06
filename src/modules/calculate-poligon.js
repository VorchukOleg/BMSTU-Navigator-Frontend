export function findPolygonCenter(vertices) {
  const numVertices = vertices.length;

  let sumX = 0;
  let sumY = 0;

  for (let i = 0; i < vertices.length; i++) {
    sumX += parseInt(vertices[i][0]); // Преобразование строки в число
    sumY += parseInt(vertices[i][1]); // Преобразование строки в число
  }

  const centerX = sumX / numVertices;
  const centerY = sumY / numVertices;

  return { x: centerX, y: centerY };
}

export function calculatePolygonWidthAndHeight(coordinates) {
  // Проверяем, что массив содержит хотя бы одну координату
  if (coordinates.length < 1) {
    throw new Error('Недостаточно координат для определения многоугольника.');
  }

  // Извлекаем координаты x и y
  const xCoordinates = coordinates.map((point) => point[0]);
  const yCoordinates = coordinates.map((point) => point[1]);

  // Вычисляем минимальные и максимальные значения координат x и y
  const minX = Math.min(...xCoordinates);
  const maxX = Math.max(...xCoordinates);
  const minY = Math.min(...yCoordinates);
  const maxY = Math.max(...yCoordinates);

  // Вычисляем ширину и высоту многоугольника
  const width = maxX - minX;
  const height = maxY - minY;

  return { width, height };
}

export function fontSizeProcessor(polygonSize) {
  const width = polygonSize.width;

  if (width > 60) {
    return 20;
  }

  return width / 3.2;
}

export const processPolygonCoordinates = (data, idPrefix) =>
  Object.values(data).map((p) => {
    const coord = Object.keys(p.coordinates).map((key) => [
      p.coordinates[key].x,
      p.coordinates[key].y,
    ]);
    if (idPrefix == 'r_id_') {
      return {
        uuid: `${idPrefix}${p.uuid}`,
        coordinates: coord,
        // eslint-disable-next-line camelcase
        displayed_name: p.displayed_name,
      };
    }

    return {
      uuid: `${idPrefix}${p.uuid}`,
      coordinates: coord,
      // eslint-disable-next-line camelcase
      basenode_type: p.basenode_type,
    };
  });
