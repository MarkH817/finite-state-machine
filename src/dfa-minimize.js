'use strict'

module.exports = (dfa) => {
  // input: a DFA object
  // output: minimized DFA object
  // using Myphill-Nerode Theorem algorithm for minimization

  /* Functions */
  function makeTable (size) {
    let table = new Array(size)

    for (let i = 0; i < size; i++) {
      table[i] = new Array(size)
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        table[i][j] = false
      }
    }

    return table
  }

  function initialChecks (table, stateList) {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < i; j++) {
        let s1 = dfa._accept(stateList[i])
        let s2 = dfa._accept(stateList[j])

        if ((s1 && !s2) || (!s1 && s2)) {
          // console.log(stateList[i], stateList[j])
          table[i][j] = true
        }
      }
    }
  }

  function checkPair (table, i, j, stateList) {
    /* Check each output state pair for their outputs */
    /* If output pair (location) is marked on table,
    *  mark input location on table */

    // Flag for the greater loop
    let wasChecked = false

    // This is beyond the entries we'll check
    // No need to check if already marked 'true'
    if (table[i][j]) return wasChecked

    let alphaSize = dfa.alphabet.length
    for (let k = 0; k < alphaSize; k++) {
      let outState1 = dfa._transition(stateList[i], dfa.alphabet[k])
      let outState2 = dfa._transition(stateList[j], dfa.alphabet[k])

      let outIndex1 = stateList.indexOf(outState1)
      let outIndex2 = stateList.indexOf(outState2)

      // Do the checking
      if (outIndex1 === outIndex2) {
        // Nothing
      } else if (outIndex1 < outIndex2) {
        if (table[outIndex2][outIndex1]) {
          table[i][j] = true
          wasChecked = true
          // console.log(i, j, 'ding')
          break
        }
      } else {
        if (table[outIndex1][outIndex2]) {
          table[i][j] = true
          wasChecked = true
          // console.log(i, j, 'ding')
          break
        }
      }
    } // End of loop

    return wasChecked
  }

  function mergeableStates (table, stateList) {
    let mergeable = []

    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < i; j++) {
        if (!table[i][j]) {
          mergeable.push([stateList[i], stateList[j]])
        }
      }
    }
  }

  /* Actions */
  let stateList = Object.keys(dfa.states)
  console.log(stateList)

  let table = makeTable(stateList.length)

  console.log(table)
  console.log('\n')

  initialChecks(table, stateList)

  console.log(table)
  console.log('\n')

  let changed = true

  while (changed) {
    changed = false

    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < i; j++) {
        changed = changed || checkPair(table, i, j, stateList)
      }
    }

    // console.log(changed)
    // console.log('\n')
  }

  console.log(table)

  // TODO: Use table method for dfa minimization
}
