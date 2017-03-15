/* global describe, it */

'use strict'

const DFA = require('../src/dfa')
const expect = require('chai').expect

let testCase = {
  alphabet: ['0', '1'],
  states: {
    'qe': {
      accept: true,
      transitions: {
        '0': 'q0',
        '1': 'qe'
      }
    },
    'q0': {
      accept: true,
      transitions: {
        '0': 'q00',
        '1': 'qe'
      }
    },
    'q00': {
      accept: true,
      transitions: {
        '0': 'q000',
        '1': 'qe'
      }
    },
    'q000': {
      accept: false,
      transitions: {
        '0': 'q000',
        '1': 'qe'
      }
    }
  },
  start: 'qe',
  accept: ['qe', 'q0', 'q00']
}

describe('DFA.js', () => {
  describe('DFA() Test Case 0', () => {
    it('Run DFA0', () => {
      let dfa = new DFA(testCase)
      let passInput = '010101'
      let failInput = '1010000'
      let pass = dfa.checkMember(passInput)
      let fail = dfa.checkMember(failInput)

      expect(pass).to.equal(true)
      expect(fail).to.equal(false)
    })
  })
})
