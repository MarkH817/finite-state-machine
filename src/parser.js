'use strict'

const fs = require('fs')

function readDFA (filename) {
  let content = fs.readFileSync(filename, 'utf-8')
  let lines = content.trim().split('\n')

  // Hold single line inputs:
  // name: "stuff"
  // "states", "input_alphabet", "start_state", "accept_states", "delta"
  let statements = []
  for (let i = 0; i < lines.length; i++) {
    let tempLine = lines[i].trim().split('#')

    if (tempLine[0].trim().length > 0) {
      statements.push(tempLine[0].trim())
    }
  }

  let dfa = {
    alphabet: [],
    states: {},
    start: null,
    accept: []
  }

  for (let i = 0; i < statements.length; i++) {
    let tempStatment = statements[i].split(':')

    switch (tempStatment[0].trim()) {
      case 'states':
        // Add the states to the list in the dfa object
        let states = tempStatment[1].trim().split(';')

        for (let j = 0; j < states.length; j++) {
          dfa.states[states[j].trim()] = {
            accept: false,
            transitions: {}
          }
        }
        break
      case 'input_alphabet':
        // Add alphabet to the list in the dfa object
        let alphabet = tempStatment[1].trim().split(';')

        for (let j = 0; j < alphabet.length; j++) {
          dfa.alphabet.push(alphabet[j].trim())
        }
        break
      case 'start_state':
        // Set the start_state in the dfa object
        dfa.start = tempStatment[1].trim()
        break
      case 'accept_states':
        // Add to accept list in the dfa object
        let accepting = tempStatment[1].trim().split(';')

        for (let j = 0; j < accepting.length; j++) {
          dfa.accept.push(accepting[j].trim())
          dfa.states[accepting[j].trim()].accept = true
        }
        break
      case 'delta':
        // Add to the transitions list for each states
        // in the dfa object
        let deltas = tempStatment[1].trim().split(';')
        let tempDelta
        let tempInput

        for (let j = 0; j < deltas.length; j++) {
          tempDelta = deltas[j].trim().split('->')
          tempInput = tempDelta[0].trim().split(',')

          // Set the transitions in the states list
          dfa.states[tempInput[0].trim()].transitions[tempInput[1].trim()] = tempDelta[1].trim()
        }
        break
    }
  }

  return dfa
}

module.exports = readDFA
