const arr = [1, 2, 3, 4, 5]

const calculateAvg = arr => arr.reduce((acc, cur) => (acc += cur), 0) / arr.length

console.log(calculateAvg(arr))
