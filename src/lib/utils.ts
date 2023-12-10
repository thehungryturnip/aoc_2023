import * as fs from "fs";

export const readFile = (day: number, example: number = 0): string => {
  const extension =
    example === 0 ? "in" : example === 1 ? "ex" : `ex${example}`;
  const path = `res/${String(day).padStart(2, "0")}.${extension}`;
  return fs.readFileSync(path).toString();
};

export const isDigit = (char: string): boolean =>
  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char);
