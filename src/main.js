'use strict'

const parser = require('./parser')
const DFA = require('./dfa')

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
} else {
  dfa.checkMember(args[3]) ? console.log('yes') : console.log('no')
}
