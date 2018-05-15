const fs = require('fs')
const path = require('path')
const {
  fsReadFile,
  fsWriteFile,
  csvParse
} = require('./util/promises')

const INPUTFILENAME = 'trumptweets.csv'

const stream = fs.createWriteStream(path.join(__dirname, '/output/', INPUTFILENAME), { flags: 'a' })

const readCSV = async () => {
  const file = await fsReadFile(path.join(__dirname, '/input/', INPUTFILENAME))
  csvParse(file)
    .then(csvContent => csvContent.map(tweet => tweet.Date))
    .then(dates => R.groupWith(R.equals, dates))
    .then(datesArr => datesArr.map(uniqDate => ({
      date: uniqDate[0],
      count: uniqDate.length
    })))
    .then(dateArrayCount => dateArrayCount.sort(function (a, b) {
      return a.count - b.count
    }))
    .then(x => console.log(x))
}

readCSV()
