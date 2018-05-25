import { formatExperimentData } from "../format-experiment-data";

describe("formatExperimentData()", () => {
  test("returns formatted experiment data", () => {
    const data = {
      "experiment--one": "variant1",
      "experiment--two": "control",
      "experiment--three": "variant2",
      "variants--one": {
        control: 50,
        variant1: 50
      },
      "variants--two": {
        control: 50,
        variant1: 50
      },
      "variants--three": {
        control: 1,
        variant1: 1,
        variant2: 1
      }
    };
    const expected = {
      one: {
        activeVariant: "variant1",
        variants: {
          control: 50,
          variant1: 50
        }
      },
      two: {
        activeVariant: "control",
        variants: {
          control: 50,
          variant1: 50
        }
      },
      three: {
        activeVariant: "variant2",
        variants: {
          control: 1,
          variant1: 1,
          variant2: 1
        }
      }
    };
    expect(formatExperimentData(data)).toEqual(expected);
  });
});
