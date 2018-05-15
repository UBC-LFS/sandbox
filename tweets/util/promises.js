const fs = require('fs')
const parse = require('csv-parse')
const { promisify } = require('util')
const path = require('path')

const fsWriteFile = promisify(fs.writeFile)
const fsReadFile = promisify(fs.readFile)
const promiseCSV = promisify(parse)
const csvParse = file => promiseCSV(file, {delimiter: ',', columns: true, relax: true, auto_parse: true})

module.exports = {
  fsReadFile,
  fsWriteFile,
  csvParse
}
