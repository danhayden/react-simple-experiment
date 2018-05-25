export function getItemTypeExperimentId(item = "") {
  const splitter = "--";
  const splitterIndex = item.indexOf(splitter);
  const type = item.substring(0, splitterIndex);
  const experimentId = item.substring(splitterIndex + splitter.length);
  return { type, experimentId };
}
