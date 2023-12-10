import * as utils from "./lib/utils";

interface Coord {
  row: number;
  col: number;
}

interface Part {
  value: number;
  coord: Coord;
}

const findNumbers = (schematic: string[]): Part[] => {
  const parts: Part[] = [];

  schematic.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      if (utils.isDigit(schematic[r][c])) {
        const cStart = c;
        while (c < row.length && utils.isDigit(row[c])) {
          c++;
        }

        parts.push({
          value: +row.substring(cStart, c),
          coord: {
            row: r,
            col: cStart,
          },
        });
      }
    }
  });

  return parts;
};

const getCoordsAround = (part: Part, schematic: string[]): Coord[] => {
  const coords: Coord[] = [];

  const length = part.value.toString().length;

  // Left and right neighbors
  [-1, length].forEach((dc) =>
    [-1, 0, 1].forEach((dr) =>
      coords.push({
        row: part.coord.row + dr,
        col: part.coord.col + dc,
      }),
    ),
  );

  // Top and bottom neighbors
  [...Array(length).keys()].forEach((dc) =>
    [-1, 1].forEach((dr) =>
      coords.push({
        row: part.coord.row + dr,
        col: part.coord.col + dc,
      }),
    ),
  );

  // Filter out-of-bounds
  return coords.filter(
    (coord) =>
      0 <= coord.row &&
      coord.row < schematic.length &&
      0 <= coord.col &&
      coord.col < schematic[0].length,
  );
};

const adjacentToSymbol = (part: Part, schematic: string[]): boolean =>
  getCoordsAround(part, schematic)
    .map((coord) => schematic[coord.row][coord.col] !== ".")
    .reduce((acc, isSymbol) => acc || isSymbol, false);

const schematic = utils
  .readFile(3)
  .split("\n")
  .filter((line) => line !== "");

export const partsSum = findNumbers(schematic)
  .filter((part) => adjacentToSymbol(part, schematic))
  .reduce((acc, part) => acc + part.value, 0);
console.log(`Day 01 Part 1: The sum of the part numbers is: ${partsSum}`);
