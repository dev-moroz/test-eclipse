import { createStore } from 'vuex'

export default createStore({
  state: {
    valute: {},
    convertVal1: "HKD",
    convertVal2: "AZN",
  },
  getters: {
    valute: state => state.valute,
    baseValute: state => state.baseValute,
    convertVal1: state => {
      if (state.valute.length > 0)
        return state.valute.find(item => item.CharCode === state.convertVal1)
    },
    convertVal2: state => {
      if (state.valute.length > 0)
        return state.valute.find(item => item.CharCode === state.convertVal2)
    },
  },
  mutations: {
    setValute(state, data) {
      state.valute = Object.keys(data).map(key => data[key])
      state.valute.map(
        item => (item.difference = (item.Value - item.Previous).toFixed(4))
      )
    },
    swapValutes(state) {
      let convertVal1 = state.convertVal1
      let convertVal2 = state.convertVal2
      state.convertVal1 = convertVal2
      state.convertVal2 = convertVal1
    },
    changeValutes(state, {name, num}) {
      if (num === 1) state.convertVal1 = name
      else state.convertVal2 = name
    }
  },
  actions: {
    getValute({ commit }) {
      fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        .then(response => response.json())
        .then(result => commit("setValute", result.Valute))
    },
    swapValutes({ commit }) {
      commit("swapValutes")
    },
    changeValutes({ commit }, data) {
      commit("changeValutes", data)
    },
  }
})
