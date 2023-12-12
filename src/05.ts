import * as utils from "./lib/utils";

interface AlmanacMapEntry {
  source: number;
  destination: number;
  range: number;
}

interface Almanac {
  seeds: number[];
  maps: AlmanacMapEntry[][];
}

const createAlmanac = (): Almanac => {
  const data = utils
    .readFile(5)
    .split("\n")
    .filter((line) => line !== "");
  const seeds = data[0]
    .split(" ")
    .slice(1)
    .map((str) => +str);

  const maps: AlmanacMapEntry[][] = [];
  data.slice(1).forEach((line) => {
    if (line[line.length - 1] === ":") {
      maps.push([]);
      return;
    }

    const values = line.split(" ").map((str) => +str);

    maps[maps.length - 1].push({
      destination: values[0],
      source: values[1],
      range: values[2],
    });
  });

  return {
    seeds,
    maps,
  };
};

const calculateDestination = (val: number, entries: AlmanacMapEntry[]) => {
  for (const entry of entries) {
    const start = entry.source;
    const end = entry.source + entry.range;
    if (start <= val && val < end) {
      const delta = val - entry.source;
      return entry.destination + delta;
    }
  }
  return val;
};

const calculateLocation = (seed: number, almanac: Almanac): number =>
  almanac.maps.reduce((val, map) => calculateDestination(val, map), seed);

const almanac = createAlmanac();

export const minLoc = almanac.seeds
  .map((seed) => calculateLocation(seed, almanac))
  .reduce((min, loc) => Math.min(min, loc), Number.MAX_SAFE_INTEGER);
console.log(`Day 05 Part 1: The minimum location is: ${minLoc}`);
