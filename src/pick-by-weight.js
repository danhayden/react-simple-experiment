export function pickByWeight(data) {
  const keys = Object.keys(data);
  const sum = keys.reduce((result, key) => result + data[key], 0);
  const isInteger = typeof sum === "number" && sum % 1 === 0;

  if (!isInteger) {
    throw new Error("All values in data must be integers");
  }

  const choose = ~~(Math.random() * sum);

  for (let i = 0, count = 0; i < keys.length; i++) {
    count += data[keys[i]];
    if (count > choose) {
      return keys[i];
    }
  }
}
