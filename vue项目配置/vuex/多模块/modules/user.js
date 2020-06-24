import { RECEIVE_TOKEN } from '../mutations-type'
const state = {}

const mutations = {
  [RECEIVE_USER](state, user) {
    state.user = user
  }
}

const actions = {
  saveUser({ commit }, user) {
    const token = user.token
    commit(RECEIVE_TOKEN, token)
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
