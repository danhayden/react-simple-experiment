import isFinite from 'is-finite'

export default function pickOneByWeight(anObj) {
  let _keys = Object.keys(anObj)
  const sum = _keys.reduce((p, c) => p + anObj[c], 0)
  if (!isFinite(sum)) {
    throw new Error('All values in object must be a numeric value')
  }
  let choose = ~~(Math.random() * sum)
  for (let i = 0, count = 0; i < _keys.length; i++) {
    count += anObj[_keys[i]]
    if (count > choose) {
      return _keys[i]
    }
  }
}
