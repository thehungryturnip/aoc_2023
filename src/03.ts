import * as utils from "./lib/utils";

interface Coord {
  row: number;
  col: number;
}

interface Part {
  value: number;
  coord: Coord;
}

interface Gear {
  this: Part;
  that: Part;
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

const findGears = (parts: Part[], schematic: string[]): Gear[] => {
  const potentialGears = new Map<string, Part[]>();

  parts.forEach((part) =>
    getCoordsAround(part, schematic).forEach((coord) => {
      if (schematic[coord.row][coord.col] !== "*") {
        return;
      }

      const key = `${coord.row}:${coord.col}`;

      const currentParts = potentialGears.get(key) ?? [];
      potentialGears.set(key, [...currentParts, part]);
    }),
  );

  return [...potentialGears.entries()]
    .filter((entry) => entry[1].length === 2)
    .map((entry) => ({
      this: entry[1][0],
      that: entry[1][1],
    }));
};

const schematic = utils
  .readFile(3)
  .split("\n")
  .filter((line) => line !== "");

const parts = findNumbers(schematic).filter((part) =>
  adjacentToSymbol(part, schematic),
);
export const partsSum = parts.reduce((acc, part) => acc + part.value, 0);
console.log(`Day 03 Part 1: The sum of the part numbers is: ${partsSum}`);

export const gearRatioSum = findGears(parts, schematic)
  .map((gear) => gear.this.value * gear.that.value)
  .reduce((acc, ratio) => acc + ratio, 0);
console.log(`Day 03 Part 2: The sum of the gear ratios is: ${gearRatioSum}`);
