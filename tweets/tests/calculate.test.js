const spell = require('spell-checker-js')
spell.load('en')

const check = spell.check('Hello, hillo, hollo, holo, hello, dsiofahogahwo')
console.log(check)
