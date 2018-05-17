const fruits = ['Wed', 'Wed', 'Tues', 'Tues', 'Tues']

var countedNames = fruits.reduce((allNames, name) => {
  if (name in allNames) {
    allNames[name]++
  } else {
    allNames[name] = 1
  }
  return allNames
}, [])

console.log(countedNames)
