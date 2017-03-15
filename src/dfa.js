'use strict'

class DFA {
  constructor (dfaData) {
    this.alphabet = dfaData.alphabet
    this.states = dfaData.states
    this.start = dfaData.start
    this.accept = dfaData.accept
  }

  _transition (state, character) {
    return this.states[state].transitions[character]
  }

  _accept (state) {
    return this.states[state].accept
  }

  checkMember (input) {
    let current = this.start

    for (let i = 0; i < input.length; i++) {
      current = this._transition(current, input[i])
    }

    return this._accept(current)
  }
}

module.exports = DFA
