import * as day00 from "../src/00";
import * as day01 from "../src/01";
import * as day02 from "../src/02";
import * as day03 from "../src/03";
import * as day04 from "../src/04";
import * as day05 from "../src/05";

it.each([
  [0, 0, "thehungryturnip", day00.user],
  [1, 1, 53386, day01.sum],
  [1, 2, 53312, day01.textSum],
  [2, 1, 2369, day02.validGameIdSum],
  [2, 2, 66363, day02.minGamePowerSum],
  [3, 1, 535235, day03.partsSum],
  [3, 2, 79844424, day03.gearRatioSum],
  [4, 1, 28750, day04.pointsSum],
  [4, 2, 10212704, day04.cardCount],
  [5, 1, 173706076, day05.minLoc],
])(
  "For day %p part %p. Expect %p.",
  (
    day: number,
    part: number,
    answer: number | string,
    actual: number | string,
  ) => expect(actual).toEqual(answer),
);
