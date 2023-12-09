import * as utils from "./lib/utils";

const MAX_COLORS = {
  red: 12,
  green: 13,
  blue: 14,
};

interface Game {
  id: number;
  subsets: Record<string, number>[];
}

const parseSubset = (str: string): Record<string, number> => {
  const subset: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const colors = str.split(",").map((s) => s.trim());
  colors.forEach((s) => {
    const spaceSplit = s.split(" ");
    subset[spaceSplit[1]] = +spaceSplit[0];
  });

  return subset;
};

const parseLine = (line: string): Game => {
  const colonSplit = line.split(":");
  return {
    id: +colonSplit[0].substring("Game ".length),
    subsets: colonSplit[1].split(";").map((str) => parseSubset(str)),
  };
};

const readGameData = (): Game[] => {
  const rawData = utils.readFile(2);
  const gameLines = rawData.split("\n").filter((line) => line !== "");
  return gameLines.map((line) => parseLine(line));
};

const isValidGame = (game: Game): boolean =>
  game.subsets
    .map(
      (subset) =>
        subset.red <= MAX_COLORS.red &&
        subset.green <= MAX_COLORS.green &&
        subset.blue <= MAX_COLORS.blue,
    )
    .reduce((acc, subset) => acc && subset, true);

const calcMinPower = (game: Game): number => {
  const minSubset = game.subsets.reduce(
    (minset, subset) => ({
      red: Math.max(minset.red, subset.red),
      green: Math.max(minset.green, subset.green),
      blue: Math.max(minset.blue, subset.blue),
    }),
    {
      red: 0,
      green: 0,
      blue: 0,
    },
  );

  return minSubset.red * minSubset.green * minSubset.blue;
};

const games = readGameData();
export const validGameIdSum = games
  .filter((game) => isValidGame(game))
  .reduce((total, game) => total + game.id, 0);
console.log(
  `Day 02 Part 1: The sum of the IDs for the valid games is: ${validGameIdSum}`,
);

export const minGamePowerSum = games
  .map((game) => calcMinPower(game))
  .reduce((total, power) => total + power);
console.log(
  `Day 02 part 2: The sum of the minimum power for each game is: ${minGamePowerSum}`,
);
