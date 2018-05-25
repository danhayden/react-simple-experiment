import { getItemTypeExperimentId } from "./get-item-type-experiment-id";

export function formatExperimentData(data = {}) {
  const experiments = {};
  for (const item in data) {
    const { type, experimentId } = getItemTypeExperimentId(item);
    experiments[experimentId] = experiments[experimentId] || {
      activeVariant: null,
      variants: []
    };
    if (type === "experiment") {
      experiments[experimentId].activeVariant = data[item];
    } else if (type === "variants") {
      experiments[experimentId].variants = data[item];
    }
  }
  return experiments;
}
