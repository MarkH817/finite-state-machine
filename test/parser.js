/* global describe, it */

'use strict'

const path = require('path')
const parse = require('../src/parser')
const expect = require('chai').expect

let filePrimary = path.resolve(__dirname, 'data/M0.dfa')

describe('Parser.js', () => {
  describe('parser() Test 0', () => {
    it('Parse M0', () => {
      let result = parse(filePrimary)

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

      let testCaseJson = JSON.stringify(testCase, null, 2)
      let resultJson = JSON.stringify(result, null, 2)

      expect(result.alphabet).to.have.lengthOf(2)
      expect(result.start).to.equal('qe')
      expect(result.accept).to.have.lengthOf(3)
      expect(resultJson).to.equal(testCaseJson)
    })
  })
})
