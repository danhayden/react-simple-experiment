import { pickByWeight } from "../pick-by-weight";

describe("pickByWeight()", () => {
  test("throws error for non integer values", () => {
    const weights = { control: 50, variant: "fifty" };
    expect(() => {
      pickByWeight(weights);
    }).toThrow();
  });

  test("correctly weights control: 50%, variant1: 25%, variant2: 25%", () => {
    const weights = { control: 50, variant1: 25, variant2: 25 };
    const results = { control: 0, variant1: 0, variant2: 0 };
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
      const result = pickByWeight(weights);
      results[result] = results[result] + 1;
    }

    // X / 10000 * 100 === X / 100
    const averages = {
      control: Math.abs(results["control"] - iterations * 0.5) / 100,
      variant1: Math.abs(results["variant1"] - iterations * 0.25) / 100,
      variant2: Math.abs(results["variant2"] - iterations * 0.25) / 100
    };

    expect(averages.control <= 1.5).toBeTruthy();
    expect(averages.variant1 <= 1.5).toBeTruthy();
    expect(averages.variant2 <= 1.5).toBeTruthy();
  });
});
