const fs = require('fs')
const path = require('path')
const {
  fsReadFile,
  fsWriteFile,
  csvParse
} = require('./util/promises')

const { calculateAvg } = require('./util/calculate')

const R = require('ramda')

const INPUTFILENAME = 'trumptweets.csv'

const stream = fs.createWriteStream(path.join(__dirname, INPUTFILENAME), { flags: 'a' })

const dateOfWeek = csv => {
}

const timeOfDay = csv => {
}

const tweetAvgLength = csv =>
  Math.round(calculateAvg(csv.map(csv => csv.Tweet_Text.length)))

// function mentions (input, arr) {
//   return arr
//     .map(csv => csv.Tweet_Text)
//     .filter(tweets => tweets.includes(input))
// }

const mentions = (input, arr) => arr
  .map(csv => csv.Tweet_Text)
  .filter(tweets => tweets.includes(input))

const readCSV = async () => {
  const file = await fsReadFile(path.join(__dirname, INPUTFILENAME))
  csvParse(file)
  //  .then(csv => tweetAvgLength(csv))
    .then(csv => mentions('Clinton', csv))
    .then(x => console.log(x))
}

readCSV()
