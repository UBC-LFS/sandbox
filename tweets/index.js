const fs = require('fs')
const path = require('path')
const {
  fsReadFile,
  fsWriteFile,
  csvParse
} = require('./util/promises')
const R = require('ramda')

const INPUTFILENAME = 'trumptweets.csv'

const stream = fs.createWriteStream(path.join(__dirname, INPUTFILENAME), { flags: 'a' })

const dateOfWeek = csv => {

}

const timeOfDay = csv => {

}

const tweetTextContent = csv => {
  const tweets = csv.map(csv => csv.Tweet_Text)
  const lengthOfTweets = tweets.map(tweet => tweet.length)
  let totalAverage = 0
  for (let i = 0; i < lengthOfTweets.length; i++) {
    totalAverage += lengthOfTweets[i]
  }
  return Math.round(totalAverage / lengthOfTweets.length)
}

const readCSV = async () => {
  const file = await fsReadFile(path.join(__dirname, INPUTFILENAME))
  csvParse(file)
    .then(csv => tweetTextContent(csv))
    .then(x => console.log(x))
}

readCSV()
