import * as fs from "fs";

export const readFile = (day: number, example: number = 0): string => {
  const extension =
    example === 0 ? "in" : example === 1 ? "ex" : `ex${example}`;
  const path = `res/${String(day).padStart(2, "0")}.${extension}`;
  return fs.readFileSync(path).toString();
};
