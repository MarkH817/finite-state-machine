'use strict'

const parser = require('./parser')
const DFA = require('./dfa')
const minmize = require('./dfa-minimize')

let args = process.argv

if (args.length !== 4) {
  console.error('ERROR! Expected 2 Arguments')
}

let dfa = new DFA(parser(args[2]))

let secondInput = args[3]

if (secondInput.endsWith('.dfa')) {
  // Reduce both DFAs and compare them
  let dfa2 = new DFA(parser(secondInput))

  // TODO: Check equivalence. Give counterexample if different.
  minmize(dfa)
  console.log('-----------')
  minmize(dfa2)
} else {
  dfa.checkMember(args[3]) ? console.log('yes') : console.log('no')
}
