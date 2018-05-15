const calculateAvg = arr => arr.length === 0 ? 'array is empty' : arr.reduce((acc, cur) => (acc += cur), 0) / arr.length

module.exports = {
  calculateAvg
}
