import * as day00 from "../src/00";

it.each([[0, 0, "thehungryturnip", day00.user]])(
  "For day %p part %p. Expect %p.",
  (
    day: number,
    part: number,
    answer: number | string,
    actual: number | string,
  ) => expect(actual).toEqual(answer),
);
