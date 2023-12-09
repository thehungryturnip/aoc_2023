import * as day00 from "../src/00";
import * as day01 from "../src/01";
import * as day02 from "../src/02";

it.each([
  [0, 0, "thehungryturnip", day00.user],
  [1, 1, 53386, day01.sum],
  [1, 2, 53312, day01.textSum],
  [2, 1, 2369, day02.validGameIdSum],
])(
  "For day %p part %p. Expect %p.",
  (
    day: number,
    part: number,
    answer: number | string,
    actual: number | string,
  ) => expect(actual).toEqual(answer),
);
