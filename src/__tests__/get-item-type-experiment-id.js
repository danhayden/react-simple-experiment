import { getItemTypeExperimentId } from "../get-item-type-experiment-id";

describe("getItemTypeExperimentId()", () => {
  test("returns type and experimentId from string", () => {
    expect(getItemTypeExperimentId("experiment--test-name")).toEqual({
      experimentId: "test-name",
      type: "experiment"
    });

    expect(getItemTypeExperimentId("variants--test-name")).toEqual({
      experimentId: "test-name",
      type: "variants"
    });
  });
});
