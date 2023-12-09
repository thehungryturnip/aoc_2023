import * as utils from "./lib/utils";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const getValue = (line: string) => {
  const digits = line.split("").filter((char) => DIGITS.includes(char));
  return +digits[0] * 10 + +digits[digits.length - 1];
};

const data = utils.readFile(1);
const lines = data.split("\n").filter((row) => row !== "");
const values = lines.map((line) => getValue(line));
export const sum = values.reduce((acc, val) => acc + val);
console.log(`Day 01 Part 1: The sum of the calibration values is: ${sum}`);
