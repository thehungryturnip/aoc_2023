import * as utils from "./lib/utils";

interface Card {
  index: number;
  winnings: number[];
  draws: Set<number>;
}

const lineToCard = (line: string): Card => {
  const colonSplit = line.split(":");
  const index = +colonSplit[0].substring("Card ".length);

  const pipeSplit = colonSplit[1].split("|").map((str) => str.trim());
  const winnings = pipeSplit[0]
    .split(" ")
    .filter((str) => str !== "")
    .map((str) => +str);
  const draws = new Set(
    pipeSplit[1]
      .split(" ")
      .filter((str) => str !== "")
      .map((str) => +str),
  );

  return {
    index,
    winnings,
    draws,
  };
};

const scoreCard = (card: Card): number => {
  const matchCount = card.winnings.filter((num) => card.draws.has(num)).length;
  return matchCount ? 2 ** (matchCount - 1) : 0;
};

const cards = utils
  .readFile(4)
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => lineToCard(line));

export const pointsSum = cards
  .map((card) => scoreCard(card))
  .reduce((acc, points) => acc + points, 0);
console.log(`Day 04 Part 1: Total number of points: ${pointsSum}`);
