import * as utils from "./lib/utils";

const DIGIT_TEXTS = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getValue = (line: string): number => {
  const digits = line.split("").filter((char) => utils.isDigit(char));
  return +digits[0] * 10 + +digits[digits.length - 1];
};

const getFirstDigit = (line: string): number => {
  for (let i = 0; i < line.length; i++) {
    if (utils.isDigit(line[i])) {
      return +line[i];
    }

    for (const [text, value] of Object.entries(DIGIT_TEXTS)) {
      const lineText = line.substring(i, i + text.length);
      if (lineText === text) {
        return value;
      }
    }
  }
  return 0;
};

const getLastDigit = (line: string): number => {
  for (let i = line.length - 1; i >= 0; i--) {
    if (utils.isDigit(line[i])) {
      return +line[i];
    }

    for (const [text, value] of Object.entries(DIGIT_TEXTS)) {
      const lineText = line.substring(i - text.length + 1, i + 1);
      if (lineText === text) {
        return value;
      }
    }
  }
  return 0;
};

const getTextValue = (line: string): number =>
  getFirstDigit(line) * 10 + getLastDigit(line);

const data = utils.readFile(1);
const lines = data.split("\n").filter((row) => row !== "");

const values = lines.map((line) => getValue(line));
export const sum = values.reduce((acc, val) => acc + val);
console.log(`Day 01 Part 1: The sum of the calibration values is: ${sum}`);

const textValues = lines.map((line) => getTextValue(line));
export const textSum = textValues.reduce((acc, val) => acc + val);
console.log(
  `Day 01 Part 2: The text sum of the calibration values is: ${textSum}`,
);
