import types from './mutation-types.js'

const mutations = {
  [types.INCREMENT] (state) {
    state.count++
  },
  [types.DECREMENT] (state) {
    state.count--
  },
  [types.INCREMENTIFODD] (state) {
    if ((state.count + 1) % 2 === 0) {
      state.count++
    }
  },
  [types.ADD] (state, payload) {
    state.tableData3.push(payload)
  }
}

export default mutations
