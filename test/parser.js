/* global describe, it */

'use strict'

const path = require('path')
const parse = require('../src/parser')
const expect = require('chai').expect

let filePrimary = path.resolve(__dirname, 'data/M0.dfa')

describe('Parser.js', () => {
  describe('parser() Test 1', () => {
    it('Parse M0', () => {
      let result = parse(filePrimary)

      let testCase = {
        alphabet: ['0', '1'],
        states: [
          {
            name: 'qe',
            transitions: [
              {'0': 'q0'},
              {'1': 'qe'}
            ]
          },
          {
            name: 'q0',
            transitions: [
              {'0': 'q00'},
              {'1': 'qe'}
            ]
          },
          {
            name: 'q00',
            transitions: [
              {'0': 'q000'},
              {'1': 'qe'}
            ]
          },
          {
            name: 'q000',
            transitions: [
              {'0': 'q000'},
              {'1': 'qe'}
            ]
          }
        ],
        start: 'qe',
        accept: ['qe', 'q0', 'q00']
      }

      expect(testCase.alphabet).to.have.lengthOf(2)
      expect(testCase.states).to.have.lengthOf(4)
      expect(testCase.start).to.equal('qe')
      expect(testCase.accept).to.have.lengthOf(3)
    })
  })
})
