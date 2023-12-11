import * as utils from "./lib/utils";

interface Card {
  index: number;
  winnings: number[];
  draws: Set<number>;
}

interface CardScore {
  card: Card;
  score: number;
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

const tallyCards = (cardScores: CardScore[]) => {
  const tally = Array(cardScores.length).fill(1);

  cardScores.forEach((cardScore) => {
    const deltas = [...Array(cardScore.score).keys()].map((num) => num + 1);

    deltas.forEach((delta) => {
      const numberToAdd = tally[cardScore.card.index - 1];
      const indexToAddTo = cardScore.card.index + delta - 1;
      tally[indexToAddTo] += numberToAdd;
    });
  });

  return tally;
};

const cards = utils
  .readFile(4)
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => lineToCard(line));

const cardScores = cards.map((card) => ({
  card,
  score: card.winnings.filter((num) => card.draws.has(num)).length,
}));

export const pointsSum = cardScores
  .map((cardScore) => (cardScore.score ? 2 ** (cardScore.score - 1) : 0))
  .reduce((acc, points) => acc + points, 0);
console.log(`Day 04 Part 1: Total number of points: ${pointsSum}`);

export const cardCount = tallyCards(cardScores).reduce(
  (acc, points) => acc + points,
  0,
);
console.log(`Day 04 Part 2: Total number of cards: ${cardCount}`);
