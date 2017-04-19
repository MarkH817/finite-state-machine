'use strict'

const Minimize = require('../src/dfa-minimize')
const Parser = require('../src/parser')
const DFA = require('../src/dfa')
const path = require('path')

let filePrimary = path.resolve(__dirname, 'data/M0.dfa')

let dfa = new DFA(Parser(filePrimary))

Minimize(dfa)
