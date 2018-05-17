const fs = require('fs')
const path = require('path')
const {
  fsReadFile,
  fsWriteFile,
  csvParse
} = require('./util/promises')
const moment = require('moment')

const { calculateAvg } = require('./util/calculate')

const R = require('ramda')

const INPUTFILENAME = 'trumptweets.csv'

const stream = fs.createWriteStream(path.join(__dirname, INPUTFILENAME), { flags: 'a' })

// Gives the day of week that Trump tweets the most
const dateOfWeek = csv =>
  csv.map(tweet => tweet.Date)
    .map(csv => moment(csv, 'YY-MM-DD').format('dddd'))
    .reduce((acc, cur) => {
      const index = acc.findIndex(weekDayObj => weekDayObj.weekDay === cur)
      if (index > -1) {
        acc[index].count++
      } else {
        acc.push({
          weekDay: cur,
          count: 1
        })
      }
      return acc
    }, [])
    .reduce((acc, cur) => {
      if (acc.count < cur.count) acc = cur
      return acc
    })

// Give hour of day that he tweets the most (standard 24 hours clock)
const timeOfDay = csv =>
  csv.map(tweet => tweet.Time)
    .map(time => moment(time, 'kk:mm:ss').format('kk'))
    .reduce((acc, cur) => {
      const index = acc.findIndex(time => time.time === cur)
      if (index > -1) {
        acc[index].count++
      } else {
        acc.push({
          time: cur,
          count: 1
        })
      }
      return acc
    }, [])
    .reduce((acc, cur) => {
      if (acc.count < cur.count) acc = cur
      return acc
    })

// Gives the average tweet length
const tweetAvgLength = csv =>
  Math.round(calculateAvg(csv.map(csv => csv.Tweet_Text.length)))

// Finds the shortest tweet by length
const shortestTweet = csv =>
  csv.map(csv => csv.Tweet_Text)[csv.map(csv => csv.Tweet_Text.length).reduce((acc, cur, index, arr) => cur < arr[acc] ? index : acc)]

// function mentions (input, arr) {
//   return arr
//     .map(csv => csv.Tweet_Text)
//     .filter(tweets => tweets.includes(input))
// }

// Looks for the tweets containing the string input
const mentions = (input, csv) => csv
  .map(csv => csv.Tweet_Text)
  .filter(tweets => tweets.includes(input))

// Counts the number of inputs in each tweet
const countInputs = (input, csv) => csv.map(tweet => tweet.Tweet_Text)
  .map(tweet => tweet.split(''))
  .map(csv => csv.filter(tweet => tweet.includes(input)))
  .map(csv => csv.length)

// Find tweet with most exclamations (still in work)
const mostExclaimTweet = csv =>
  csv.map(csv => csv.Tweet_Text)[countInputs('!', csv).reduce((acc, cur, index, arr) => cur > arr[acc] ? index : acc, 0)]

const readCSV = async () => {
  const file = await fsReadFile(path.join(__dirname, INPUTFILENAME))
  csvParse(file)
  //  .then(csv => tweetAvgLength(csv))
  //  .then(csv => shortestTweet(csv))
  //  .then(csv => dateOfWeek(csv))
    .then(csv => timeOfDay(csv))
  //  .then(csv => mentions('Clinton', csv))
  //  .then(csv => countInputs('!', csv))
  //  .then(csv => mostExclaimTweet(csv))
    .then(x => console.log(x))
}

readCSV()
